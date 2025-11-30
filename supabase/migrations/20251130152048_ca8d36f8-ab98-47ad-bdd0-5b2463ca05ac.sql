-- Create enum for panel types / انواع پنل‌های هاست
CREATE TYPE public.hosting_panel_type AS ENUM ('cpanel', 'directadmin', 'cyberpanel', 'aapanel', 'plesk', 'cwp');

-- Create enum for hosting status / وضعیت سرویس هاست
CREATE TYPE public.hosting_status AS ENUM ('pending', 'active', 'suspended', 'cancelled', 'expired');

-- Create hosting packages table / جدول پکیج‌های هاست
CREATE TABLE public.hosting_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_fa TEXT NOT NULL,
    description TEXT,
    description_fa TEXT,
    disk_space_gb INTEGER NOT NULL DEFAULT 1,
    bandwidth_gb INTEGER NOT NULL DEFAULT 10,
    email_accounts INTEGER NOT NULL DEFAULT 5,
    databases INTEGER NOT NULL DEFAULT 1,
    subdomains INTEGER NOT NULL DEFAULT 5,
    addon_domains INTEGER NOT NULL DEFAULT 0,
    ssl_free BOOLEAN NOT NULL DEFAULT true,
    backup_daily BOOLEAN NOT NULL DEFAULT false,
    price_monthly DECIMAL(12,0) NOT NULL DEFAULT 0,
    price_yearly DECIMAL(12,0) NOT NULL DEFAULT 0,
    supported_panels hosting_panel_type[] NOT NULL DEFAULT '{cpanel}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting services table / جدول سرویس‌های هاست کاربران
CREATE TABLE public.hosting_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    package_id UUID REFERENCES public.hosting_packages(id),
    service_name TEXT NOT NULL,
    domain TEXT NOT NULL,
    panel_type hosting_panel_type NOT NULL DEFAULT 'cpanel',
    server_ip TEXT,
    server_location TEXT DEFAULT 'Tehran',
    username TEXT,
    password TEXT,
    nameserver1 TEXT DEFAULT 'ns1.example.com',
    nameserver2 TEXT DEFAULT 'ns2.example.com',
    status hosting_status NOT NULL DEFAULT 'pending',
    disk_used_mb INTEGER DEFAULT 0,
    bandwidth_used_mb INTEGER DEFAULT 0,
    email_count INTEGER DEFAULT 0,
    database_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting DNS records table / جدول رکوردهای DNS
CREATE TABLE public.hosting_dns_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.hosting_services(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL DEFAULT 'A',
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    ttl INTEGER NOT NULL DEFAULT 3600,
    proxied BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting backups table / جدول بکاپ‌ها
CREATE TABLE public.hosting_backups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.hosting_services(id) ON DELETE CASCADE NOT NULL,
    backup_type TEXT NOT NULL DEFAULT 'full',
    size_mb INTEGER NOT NULL DEFAULT 0,
    file_path TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting email accounts table / جدول اکانت‌های ایمیل
CREATE TABLE public.hosting_email_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.hosting_services(id) ON DELETE CASCADE NOT NULL,
    email TEXT NOT NULL,
    quota_mb INTEGER NOT NULL DEFAULT 500,
    used_mb INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting databases table / جدول دیتابیس‌ها
CREATE TABLE public.hosting_databases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.hosting_services(id) ON DELETE CASCADE NOT NULL,
    db_name TEXT NOT NULL,
    db_user TEXT NOT NULL,
    size_mb INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS / فعال‌سازی امنیت سطر
ALTER TABLE public.hosting_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_dns_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_email_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_databases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hosting_packages (public read)
CREATE POLICY "Anyone can view active packages" ON public.hosting_packages
    FOR SELECT USING (is_active = true);

-- RLS Policies for hosting_services
CREATE POLICY "Users can view their own services" ON public.hosting_services
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own services" ON public.hosting_services
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own services" ON public.hosting_services
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for DNS records
CREATE POLICY "Users can manage their DNS records" ON public.hosting_dns_records
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.hosting_services WHERE id = service_id AND user_id = auth.uid())
    );

-- RLS Policies for backups
CREATE POLICY "Users can view their backups" ON public.hosting_backups
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.hosting_services WHERE id = service_id AND user_id = auth.uid())
    );

-- RLS Policies for email accounts
CREATE POLICY "Users can manage their email accounts" ON public.hosting_email_accounts
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.hosting_services WHERE id = service_id AND user_id = auth.uid())
    );

-- RLS Policies for databases
CREATE POLICY "Users can manage their databases" ON public.hosting_databases
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.hosting_services WHERE id = service_id AND user_id = auth.uid())
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_hosting_packages_updated_at
    BEFORE UPDATE ON public.hosting_packages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hosting_services_updated_at
    BEFORE UPDATE ON public.hosting_services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hosting_dns_records_updated_at
    BEFORE UPDATE ON public.hosting_dns_records
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
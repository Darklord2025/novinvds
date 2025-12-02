export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      hosting_backups: {
        Row: {
          backup_type: string
          created_at: string
          file_path: string | null
          id: string
          service_id: string
          size_mb: number
          status: string
        }
        Insert: {
          backup_type?: string
          created_at?: string
          file_path?: string | null
          id?: string
          service_id: string
          size_mb?: number
          status?: string
        }
        Update: {
          backup_type?: string
          created_at?: string
          file_path?: string | null
          id?: string
          service_id?: string
          size_mb?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hosting_backups_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "hosting_services"
            referencedColumns: ["id"]
          },
        ]
      }
      hosting_databases: {
        Row: {
          created_at: string
          db_name: string
          db_user: string
          id: string
          service_id: string
          size_mb: number
        }
        Insert: {
          created_at?: string
          db_name: string
          db_user: string
          id?: string
          service_id: string
          size_mb?: number
        }
        Update: {
          created_at?: string
          db_name?: string
          db_user?: string
          id?: string
          service_id?: string
          size_mb?: number
        }
        Relationships: [
          {
            foreignKeyName: "hosting_databases_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "hosting_services"
            referencedColumns: ["id"]
          },
        ]
      }
      hosting_dns_records: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          proxied: boolean
          service_id: string
          ttl: number
          type: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          proxied?: boolean
          service_id: string
          ttl?: number
          type?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          proxied?: boolean
          service_id?: string
          ttl?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hosting_dns_records_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "hosting_services"
            referencedColumns: ["id"]
          },
        ]
      }
      hosting_email_accounts: {
        Row: {
          created_at: string
          email: string
          id: string
          quota_mb: number
          service_id: string
          used_mb: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          quota_mb?: number
          service_id: string
          used_mb?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          quota_mb?: number
          service_id?: string
          used_mb?: number
        }
        Relationships: [
          {
            foreignKeyName: "hosting_email_accounts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "hosting_services"
            referencedColumns: ["id"]
          },
        ]
      }
      hosting_packages: {
        Row: {
          addon_domains: number
          backup_daily: boolean
          bandwidth_gb: number
          created_at: string
          databases: number
          description: string | null
          description_fa: string | null
          disk_space_gb: number
          email_accounts: number
          id: string
          is_active: boolean
          name: string
          name_fa: string
          price_monthly: number
          price_yearly: number
          sort_order: number
          ssl_free: boolean
          subdomains: number
          supported_panels: Database["public"]["Enums"]["hosting_panel_type"][]
          updated_at: string
        }
        Insert: {
          addon_domains?: number
          backup_daily?: boolean
          bandwidth_gb?: number
          created_at?: string
          databases?: number
          description?: string | null
          description_fa?: string | null
          disk_space_gb?: number
          email_accounts?: number
          id?: string
          is_active?: boolean
          name: string
          name_fa: string
          price_monthly?: number
          price_yearly?: number
          sort_order?: number
          ssl_free?: boolean
          subdomains?: number
          supported_panels?: Database["public"]["Enums"]["hosting_panel_type"][]
          updated_at?: string
        }
        Update: {
          addon_domains?: number
          backup_daily?: boolean
          bandwidth_gb?: number
          created_at?: string
          databases?: number
          description?: string | null
          description_fa?: string | null
          disk_space_gb?: number
          email_accounts?: number
          id?: string
          is_active?: boolean
          name?: string
          name_fa?: string
          price_monthly?: number
          price_yearly?: number
          sort_order?: number
          ssl_free?: boolean
          subdomains?: number
          supported_panels?: Database["public"]["Enums"]["hosting_panel_type"][]
          updated_at?: string
        }
        Relationships: []
      }
      hosting_services: {
        Row: {
          bandwidth_used_mb: number | null
          created_at: string
          database_count: number | null
          disk_used_mb: number | null
          domain: string
          email_count: number | null
          expires_at: string | null
          id: string
          nameserver1: string | null
          nameserver2: string | null
          package_id: string | null
          panel_type: Database["public"]["Enums"]["hosting_panel_type"]
          password: string | null
          server_ip: string | null
          server_location: string | null
          service_name: string
          status: Database["public"]["Enums"]["hosting_status"]
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          bandwidth_used_mb?: number | null
          created_at?: string
          database_count?: number | null
          disk_used_mb?: number | null
          domain: string
          email_count?: number | null
          expires_at?: string | null
          id?: string
          nameserver1?: string | null
          nameserver2?: string | null
          package_id?: string | null
          panel_type?: Database["public"]["Enums"]["hosting_panel_type"]
          password?: string | null
          server_ip?: string | null
          server_location?: string | null
          service_name: string
          status?: Database["public"]["Enums"]["hosting_status"]
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          bandwidth_used_mb?: number | null
          created_at?: string
          database_count?: number | null
          disk_used_mb?: number | null
          domain?: string
          email_count?: number | null
          expires_at?: string | null
          id?: string
          nameserver1?: string | null
          nameserver2?: string | null
          package_id?: string | null
          panel_type?: Database["public"]["Enums"]["hosting_panel_type"]
          password?: string | null
          server_ip?: string | null
          server_location?: string | null
          service_name?: string
          status?: Database["public"]["Enums"]["hosting_status"]
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hosting_services_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "hosting_packages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      hosting_panel_type:
        | "cpanel"
        | "directadmin"
        | "cyberpanel"
        | "aapanel"
        | "plesk"
        | "cwp"
      hosting_status:
        | "pending"
        | "active"
        | "suspended"
        | "cancelled"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      hosting_panel_type: [
        "cpanel",
        "directadmin",
        "cyberpanel",
        "aapanel",
        "plesk",
        "cwp",
      ],
      hosting_status: [
        "pending",
        "active",
        "suspended",
        "cancelled",
        "expired",
      ],
    },
  },
} as const

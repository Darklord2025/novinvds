import BackButton from "./BackButton";
import React from "react";
import PanelNotifications from "./PanelNotifications";
import GenericServiceManagement from "./GenericServiceManagement";
import LegacyLocale from "@/components/LegacyLocale";
const loadWalletUsagePage = () => import("./WalletUsagePage");
const WalletUsagePage = React.lazy(loadWalletUsagePage);
const loadServiceRenewalPage = () => import("./ServiceRenewalPage");
const ServiceRenewalPage = React.lazy(loadServiceRenewalPage);
const loadDomainOrderPage = () => import("./DomainOrderPage");
const DomainOrderPage = React.lazy(loadDomainOrderPage);
const loadAddonCatalogPage = () => import("./AddonCatalogPage");
const AddonCatalogPage = React.lazy(loadAddonCatalogPage);

import Dashboard from "./Dashboard";
const loadWHMCSServicesPage = () => import("./WHMCSServicesPage");
const WHMCSServicesPage = React.lazy(loadWHMCSServicesPage);

const loadTicketsPage = () => import("./TicketsPage");
const TicketsPage = React.lazy(loadTicketsPage);
const loadWalletPage = () => import("./WalletPage");
const WalletPage = React.lazy(loadWalletPage);

const loadDownloadsPage = () => import("./DownloadsPage");
const DownloadsPage = React.lazy(loadDownloadsPage);
const loadProfileSettingsPage = () => import("./ProfileSettingsPage");
const ProfileSettingsPage = React.lazy(loadProfileSettingsPage);
const loadNotificationDetails = () => import("./NotificationDetails");
const NotificationDetails = React.lazy(loadNotificationDetails);
const loadTicketDetail = () => import("./TicketDetail");
const TicketDetail = React.lazy(loadTicketDetail);
const loadDomainManagement = () => import("./DomainManagement");
const DomainManagement = React.lazy(loadDomainManagement);
const loadCreateTicketForm = () => import("./CreateTicketForm");
const CreateTicketForm = React.lazy(loadCreateTicketForm);
const loadDomainServicesPage = () => import("./DomainServicesPage");
const DomainServicesPage = React.lazy(loadDomainServicesPage);
const loadAffiliateCenter = () => import("./AffiliateCenter");
const AffiliateCenter = React.lazy(loadAffiliateCenter);
const loadKnowledgeBase = () => import("./KnowledgeBase");
const KnowledgeBase = React.lazy(loadKnowledgeBase);
const loadNetworkStoreSection = () => import("./NetworkStoreSection");
const NetworkStoreSection = React.lazy(loadNetworkStoreSection);
const loadRecommendationSection = () => import("./RecommendationSection");
const RecommendationSection = React.lazy(loadRecommendationSection);
const loadServerManagementDetail = () => import("./ServerManagementDetail");
const ServerManagementDetail = React.lazy(loadServerManagementDetail);

const loadHostingManagementPanel = () => import("./HostingManagementPanel");
const HostingManagementPanel = React.lazy(loadHostingManagementPanel);
const loadHostingGateway = () => import("./HostingGateway");
const HostingGateway = React.lazy(loadHostingGateway);
const loadCartPage = () => import("./CartPage");
const CartPage = React.lazy(loadCartPage);

const loadInvoicesPage = () => import("./InvoicesPage");
const InvoicesPage = React.lazy(loadInvoicesPage);
const loadWalletTopUpPage = () => import("./WalletTopUpPage");
const WalletTopUpPage = React.lazy(loadWalletTopUpPage);

const loadServiceCalculatorPage = () => import("./ServiceCalculatorPage");
const ServiceCalculatorPage = React.lazy(loadServiceCalculatorPage);

const loadProformaInvoicePage = () => import("./ProformaInvoicePage");
const ProformaInvoicePage = React.lazy(loadProformaInvoicePage);
const BillingOverviewPage = React.lazy(() => import("./BillingOverviewPage"));
const TransactionsPage = React.lazy(() => import("./TransactionsPage"));
const ManagedSupportOrder = React.lazy(() => import("./ManagedSupportOrder"));
const HostingCatalog = React.lazy(() => import("@/components/HostingCatalog"));
const ServiceOrderSection = React.lazy(() => import("./ServiceOrderSection"));
const loadServiceOrderPage = () => import("./ServiceOrderPage");
const ServiceOrderPage = React.lazy(loadServiceOrderPage);
import { NavigationHandlers } from "@/services/panelNavigationService";
import { PanelContentProps } from "./interfaces";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
const loadDevelopmentMessage = () => import("./DevelopmentMessage");
const DevelopmentMessage = React.lazy(loadDevelopmentMessage);

export const preloadPanelViews = () =>
  Promise.allSettled([
    loadWalletUsagePage(),
    loadServiceRenewalPage(),
    loadDomainOrderPage(),
    loadAddonCatalogPage(),
    loadWHMCSServicesPage(),
    loadTicketsPage(),
    loadWalletPage(),
    loadDownloadsPage(),
    loadProfileSettingsPage(),
    loadNotificationDetails(),
    loadTicketDetail(),
    loadDomainManagement(),
    loadCreateTicketForm(),
    loadDomainServicesPage(),
    loadAffiliateCenter(),
    loadKnowledgeBase(),
    loadNetworkStoreSection(),
    loadRecommendationSection(),
    loadServerManagementDetail(),
    loadHostingManagementPanel(),
    loadHostingGateway(),
    loadCartPage(),
    loadInvoicesPage(),
    loadWalletTopUpPage(),
    loadServiceCalculatorPage(),
    loadProformaInvoicePage(),
    loadServiceOrderPage(),
    loadDevelopmentMessage(),
  ]);

const PanelContent: React.FC<PanelContentProps> = ({
  activeTab,
  selectedService,
  selectedNotification,
  selectedAnnouncement,
  selectedTicket,
  isNewTicket,
  navigationHandlers,
}) => {
  const {
    navigateToServiceOrderPage,
    handleViewTicket,
    handleCreateNewTicket,
    handleResetServer,
    handleRenewService,
    handleManageService,
    handleViewInvoice,
    handleDownloadInvoice,
    handlePayInvoice,
  } = navigationHandlers;

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [serverToReset, setServerToReset] = useState({ type: "", id: "" });

  const handleResetRequest = (type: string, id: string) => {
    setServerToReset({ type, id });
    setResetDialogOpen(true);
  };

  const confirmReset = () => {
    setResetDialogOpen(false);
    handleResetServer?.(serverToReset.type, serverToReset.id);
  };
  const unavailable = () =>
    toast({
      title: "عملیات متصل نیست",
      description: "درخواستی ذخیره یا اجرا نشده است.",
    });
  const handleSuspendService = unavailable;
  const handleUnsuspendService = unavailable;
  const handleTerminateService = unavailable;

  if (activeTab.startsWith("order-hosting"))
    return (
      <HostingCatalog
        key={activeTab}
        inPanel
        initialCategory={activeTab}
        onCart={() => navigationHandlers.handleSidebarClick("cart")}
      />
    );
  if(activeTab.startsWith("order-dedicated")||activeTab.startsWith("order-vps")) return <ServiceOrderPage category={activeTab} onBack={()=>navigationHandlers.handleSidebarClick("order-services")}/>;
  if (activeTab.startsWith("order-domain"))
    return (
      <LegacyLocale>
        {
          <DomainOrderPage
            onOwnedDomains={() =>
              navigationHandlers.handleSidebarClick("domains")
            }
            key={activeTab}
            initialMode={
              activeTab.includes("transfer")
                ? "transfer"
                : activeTab.includes("existing")
                  ? "existing"
                  : "register"
            }
            initialView={activeTab.includes("pricing") ? "pricing" : "search"}
            onBack={() => navigationHandlers.handleSidebarClick("dashboard")}
          />
        }
      </LegacyLocale>
    );
  if (activeTab === "order-support") return <ManagedSupportOrder />;
  if (["order-modules", "order-panels"].includes(activeTab))
    return <LegacyLocale>{<AddonCatalogPage />}</LegacyLocale>;
  switch (activeTab) {
    case "order-services":
      return (
        <ServiceOrderSection
          navigateToServiceOrderPage={navigateToServiceOrderPage}
        />
      );
    case "wallet-usage":
      return (
        <LegacyLocale>
          {
            <WalletUsagePage
              onBack={() => navigationHandlers.handleSidebarClick("wallet")}
            />
          }
        </LegacyLocale>
      );
    case "service-renewal":
      return selectedService ? (
        <ServiceRenewalPage
          serviceId={selectedService}
          onBack={() => handleManageService(selectedService)}
          onInvoice={handleViewInvoice}
          onWallet={() => navigationHandlers.handleSidebarClick("wallet-topup")}
        />
      ) : null;
    case "dashboard":
      return (
        <LegacyLocale>
          {
            <>
              <Dashboard
                navigateToServiceOrderPage={navigateToServiceOrderPage}
                onResetRequest={handleResetRequest}
              />

              <AlertDialog
                open={resetDialogOpen}
                onOpenChange={setResetDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>تأیید ریست سرور</AlertDialogTitle>
                    <AlertDialogDescription>
                      آیا از ریست سرور {serverToReset.id} اطمینان دارید؟ تمام
                      اطلاعات و تنظیمات به حالت اولیه بازخواهند گشت.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmReset}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      تأیید ریست
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          }
        </LegacyLocale>
      );
    case "recommendations":
      return <LegacyLocale>{<RecommendationSection />}</LegacyLocale>;
    case "cart":
      return (
        <LegacyLocale>
          {
            <CartPage
              onCheckout={() =>
                navigationHandlers.handleSidebarClick("checkout")
              }
              onBrowseServices={() =>
                navigationHandlers.handleSidebarClick("order-vps")
              }
            />
          }
        </LegacyLocale>
      );
    case "checkout":
      return (
        <LegacyLocale>
          {
            <ProformaInvoicePage
              onBack={() => navigationHandlers.handleSidebarClick("cart")}
            />
          }
        </LegacyLocale>
      );
    case "order-hosting":
    case "order-hosting-linux-eco":
    case "order-hosting-linux-pro":
    case "order-hosting-linux-pro-ir":
    case "order-hosting-linux-vip":
    case "order-hosting-linux-ir":
    case "order-hosting-wordpress":
    case "order-hosting-woocommerce":
    case "order-hosting-windows":
    case "order-hosting-windows-ir":
    case "order-hosting-python":
    case "order-hosting-nodejs":
    case "order-hosting-download":
    case "order-hosting-warez":
    case "order-hosting-email":
    case "order-hosting-custom":
    case "order-vps":
    case "order-vps-linux":
    case "order-vps-windows":
    case "order-vps-ubuntu-desktop":
    case "order-vps-linux-ir":
    case "order-vps-windows-ir":
    case "order-vps-mikrotik":
    case "order-vps-multilocation":
    case "order-vps-storage":
    case "order-vps-hourly":
    case "order-vps-daily":
    case "order-vps-managed":
    case "order-vps-custom":
    case "order-dedicated":
    case "order-dedicated-iran":
    case "order-dedicated-europe":
    case "order-dedicated-usa":
    case "order-dedicated-asia":
    case "order-dedicated-gpu":
    case "order-dedicated-storage":
    case "order-domain":
    case "order-domain-ir":
    case "order-domain-com":
    case "order-domain-net":
    case "order-domain-org":
    case "order-domain-co":
    case "order-domain-io":
    case "order-domain-me":
    case "order-domain-info":
    case "order-domain-biz":
    case "order-domain-shop":
    case "order-domain-app":
    case "order-domain-dev":
    case "order-domain-xyz":
    case "order-domain-online":
    case "order-domain-site":
    case "order-domain-store":
    case "order-domain-asia":
    case "order-domain-co-ir":
    case "order-domain-ac-ir":
    case "order-panels":
    case "order-modules":
    case "order-support":
      return (
        <LegacyLocale>
          {
            <ServiceOrderPage
              category={activeTab}
              onBack={() => navigationHandlers.handleSidebarClick("dashboard")}
            />
          }
        </LegacyLocale>
      );
    case "profile":
      return <LegacyLocale>{<ProfileSettingsPage />}</LegacyLocale>;
    case "server-management":
    case "servers":
    case "dedicated":
    case "cloud":
    case "hosting": {
      const kindMap: Record<string, any> = {
        "server-management": "all",
        servers: "all",
        dedicated: "dedicated",
        cloud: "cloud",
        hosting: "hosting",
      };
      return (
        <LegacyLocale>
          {
            <WHMCSServicesPage
              onManageService={handleManageService}
              onRenewService={(id, kind) => handleRenewService(kind, id)}
              onSuspendService={handleSuspendService}
              onUnsuspendService={handleUnsuspendService}
              onTerminateService={handleTerminateService}
              onViewInvoice={handleViewInvoice}
              onBack={() => navigationHandlers.handleSidebarClick("dashboard")}
              initialKind={kindMap[activeTab]}
            />
          }
        </LegacyLocale>
      );
    }
    case "domains":
      return (
        <LegacyLocale>
          {
            <DomainServicesPage
              onManageDomain={handleManageService}
              onRenewDomain={(id, kind) =>
                handleRenewService(kind ?? "domain", id)
              }
              onBack={() => navigationHandlers.handleSidebarClick("dashboard")}
            />
          }
        </LegacyLocale>
      );
    case "service-unavailable":
      return (
        <LegacyLocale>
          {
            <div className="space-y-4">
              <p>سرویس در دسترس نیست / Service unavailable</p>
              <BackButton
                variant="outline"
                onClick={() => navigationHandlers.handleSidebarClick("servers")}
              >
                بازگشت به سرویس‌ها
              </BackButton>
            </div>
          }
        </LegacyLocale>
      );
    case "domain-management":
      return selectedService ? (
        <DomainManagement
          key={selectedService}
          domainId={selectedService}
          onBack={() => navigationHandlers.handleSidebarClick("domains")}
          onRenew={() => handleRenewService("domain", selectedService)}
        />
      ) : null;
    case "vps-management":
      return selectedService ? (
        <ServerManagementDetail
          serverId={selectedService}
          serverType="vps"
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onRenew={() => handleRenewService("", selectedService)}
        />
      ) : null;
    case "dedicated-management":
      return selectedService ? (
        <ServerManagementDetail
          serverId={selectedService}
          serverType="dedicated"
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onRenew={() => handleRenewService("", selectedService)}
        />
      ) : null;
    case "cloud-management":
      return selectedService ? (
        <ServerManagementDetail
          serverId={selectedService}
          serverType="cloud"
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onRenew={() => handleRenewService("", selectedService)}
        />
      ) : null;
    case "multilocation-management":
      return selectedService ? (
        <ServerManagementDetail
          key={selectedService}
          serverId={selectedService}
          serverType="multilocation"
          onRenew={() => handleRenewService("multilocation", selectedService)}
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
        />
      ) : null;
    case "hourly-management":
      return selectedService ? (
        <ServerManagementDetail
          serverId={selectedService}
          serverType="hourly"
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onRenew={() => handleRenewService("", selectedService)}
        />
      ) : null;
    case "license-management":
    case "ssl-management":
    case "network-management":
    case "addon-management":
    case "support-management":
      return selectedService ? (
        <GenericServiceManagement
          id={selectedService}
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onRenew={() => handleRenewService("", selectedService)}
        />
      ) : null;
    case "hosting-management":
      return selectedService ? (
        <HostingManagementPanel
          serviceId={selectedService}
          onBack={() => navigationHandlers.handleSidebarClick("hosting")}
          onRenew={() => handleRenewService("hosting", selectedService)}
        />
      ) : null;
    case "hosting-gateway":
      return selectedService ? (
        <HostingGateway
          serviceId={selectedService}
          onBack={() => navigationHandlers.handleSidebarClick("servers")}
          onEnterPanel={() =>
            navigationHandlers.handleManageService("hosting", selectedService)
          }
        />
      ) : null;
    case "tickets":
      return isNewTicket ? (
        <CreateTicketForm
          onSubmit={() => navigateToServiceOrderPage("/tickets")}
          onCancel={() => navigateToServiceOrderPage("/tickets")}
        />
      ) : (
        <TicketsPage
          onViewTicket={handleViewTicket}
          onCreateNewTicket={handleCreateNewTicket}
        />
      );
    case "ticket-details":
      return selectedTicket ? (
        <TicketDetail
          ticketId={selectedTicket}
          onBack={() => navigateToServiceOrderPage("/tickets")}
        />
      ) : null;
    case "whmcs-invoices":
      return <LegacyLocale>{<InvoicesPage />}</LegacyLocale>;
    case "wallet":
      return (
        <LegacyLocale>
          {<WalletPage onNavigate={navigateToServiceOrderPage} />}
        </LegacyLocale>
      );
    case "affiliate":
      return (
        <LegacyLocale>
          {
            <AffiliateCenter
              onWallet={() => navigationHandlers.handleSidebarClick("wallet")}
            />
          }
        </LegacyLocale>
      );
    case "knowledge-base":
      return <LegacyLocale>{<KnowledgeBase />}</LegacyLocale>;
    case "security":
      return (
        <LegacyLocale>
          {<ProfileSettingsPage key="security" initialTab="security" />}
        </LegacyLocale>
      );
    case "financial":
    case "financial-overview":
      return (
        <BillingOverviewPage
          navigateToServiceOrderPage={navigateToServiceOrderPage}
        />
      );
    case "transactions":
      return (
        <TransactionsPage
          onBack={() =>
            navigationHandlers.handleSidebarClick("financial-overview")
          }
        />
      );
    case "invoice-detail":
    case "invoice-payment":
      return (
        <LegacyLocale key={`${activeTab}-${selectedService}`}>
          {
            <InvoicesPage
              key={`${activeTab}-${selectedService}`}
              initialInvoiceId={selectedService ?? undefined}
              initialMode={activeTab === "invoice-payment" ? "pay" : "view"}
              onBack={() => navigationHandlers.handleSidebarClick("invoices")}
            />
          }
        </LegacyLocale>
      );
    case "invoices":
      return (
        <LegacyLocale>
          {
            <InvoicesPage
              onBack={() =>
                navigationHandlers.navigateToServiceOrderPage("/wallet")
              }
            />
          }
        </LegacyLocale>
      );
    case "wallet-topup":
      return (
        <LegacyLocale>
          {
            <WalletTopUpPage
              onBack={() =>
                navigationHandlers.navigateToServiceOrderPage("/wallet")
              }
            />
          }
        </LegacyLocale>
      );
    case "service-calculator":
      return <LegacyLocale>{<ServiceCalculatorPage />}</LegacyLocale>;
    case "downloads":
      return (
        <LegacyLocale>
          {
            <DownloadsPage
              onKnowledge={() =>
                navigationHandlers.handleSidebarClick("knowledge-base")
              }
            />
          }
        </LegacyLocale>
      );
    case "notifications":
      return <LegacyLocale>{<PanelNotifications />}</LegacyLocale>;
    case "notification-details":
      return selectedNotification ? (
        <NotificationDetails
          notification={selectedNotification}
          onBack={() => navigationHandlers.handleViewAllNotifications()}
        />
      ) : null;
    case "important-announcements":
      return (
        <LegacyLocale>{<PanelNotifications importantOnly />}</LegacyLocale>
      );
    case "announcement-details":
      return selectedAnnouncement ? (
        <NotificationDetails
          notification={selectedAnnouncement}
          onBack={() => navigationHandlers.handleViewImportantAnnouncements()}
        />
      ) : null;
    default:
      return (
        <LegacyLocale>
          {
            <Dashboard
              navigateToServiceOrderPage={navigateToServiceOrderPage}
              onResetRequest={handleResetRequest}
            />
          }
        </LegacyLocale>
      );
  }
};

export default PanelContent;

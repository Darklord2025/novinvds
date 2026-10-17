import ServiceDeliveryInfo from './ServiceDeliveryInfo';
export default function ServiceInfoPage({ serviceId }: { serviceId?: string }) { return <ServiceDeliveryInfo serviceId={serviceId ?? ''} />; }

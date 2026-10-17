import { UnifiedService, getServiceById, getDomainById } from '@/data/userServices';
export function serviceIPs(service: UnifiedService) {
  return [...new Set([...(service.ip ? [service.ip] : []), ...(service.ips ?? [])])].map(address => ({ address, family: address.includes(':') ? 'IPv6' : 'IPv4', location: service.ipLocations?.[address] }));
}
export function managementTab(id: string) {
  if (getDomainById(id)) return 'domain-management';
  const service = getServiceById(id);
  return service ? `${service.kind}-management` : 'service-unavailable';
}

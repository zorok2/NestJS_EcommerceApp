import { GetAllApiRoleQueryHandler } from './get-all-api-role.query';
import { GetPublicEndpointQueryHandler } from './get-access-endpoint.query';
import { GetSpecificAccessApiQueryHandler } from './get-specific-access.query';

export const QueryHandlers = [
  GetAllApiRoleQueryHandler,
  GetPublicEndpointQueryHandler,
  GetSpecificAccessApiQueryHandler,
];

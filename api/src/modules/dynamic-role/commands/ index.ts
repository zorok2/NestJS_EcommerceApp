import { CreateDynamicApiRoleHandler } from './create-dynamic-role.command';
import { DeleteAccessApiEndpointCommandHandler } from './remove-access-endpoint.command';

export const CommandHandlers = [
  CreateDynamicApiRoleHandler,
  DeleteAccessApiEndpointCommandHandler,
];

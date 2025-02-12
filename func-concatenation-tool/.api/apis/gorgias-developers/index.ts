import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'gorgias-developers/1.0.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Retrieve your account
   *
   */
  getAccount(): Promise<FetchResponse<200, types.GetAccountResponse200>> {
    return this.core.fetch('/api/account', 'get');
  }

  /**
   * Create a setting for the current account.
   *
   * @summary Create a setting
   */
  createAccountSetting(body: types.CreateAccountSettingBodyParam): Promise<FetchResponse<201, types.CreateAccountSettingResponse201>> {
    return this.core.fetch('/api/account/settings', 'post', body);
  }

  /**
   * List account settings matching the given parameters, paginated.
   *
   * @summary List settings
   */
  listAccountSettings(metadata?: types.ListAccountSettingsMetadataParam): Promise<FetchResponse<200, types.ListAccountSettingsResponse200>> {
    return this.core.fetch('/api/account/settings', 'get', metadata);
  }

  /**
   * Update a setting for the current account.
   *
   * @summary Update a setting
   */
  updateAccountSetting(body: types.UpdateAccountSettingBodyParam, metadata: types.UpdateAccountSettingMetadataParam): Promise<FetchResponse<200, types.UpdateAccountSettingResponse200>> {
    return this.core.fetch('/api/account/settings/{id}', 'put', body, metadata);
  }

  /**
   * Create a customer
   *
   */
  createCustomer(body: types.CreateCustomerBodyParam): Promise<FetchResponse<201, types.CreateCustomerResponse201>> {
    return this.core.fetch('/api/customers', 'post', body);
  }

  /**
   * Delete customers
   *
   */
  deleteCustomers(body: types.DeleteCustomersBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/customers', 'delete', body);
  }

  /**
   * List customers, paginated, and ordered by their name (alphabetical order).
   *
   * @summary List customers
   */
  listCustomers(metadata?: types.ListCustomersMetadataParam): Promise<FetchResponse<200, types.ListCustomersResponse200>> {
    return this.core.fetch('/api/customers', 'get', metadata);
  }

  /**
   * Delete a customer
   *
   */
  deleteCustomer(metadata: types.DeleteCustomerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/customers/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a customer
   *
   */
  getCustomer(metadata: types.GetCustomerMetadataParam): Promise<FetchResponse<200, types.GetCustomerResponse200>> {
    return this.core.fetch('/api/customers/{id}', 'get', metadata);
  }

  /**
   * Update a customer
   *
   */
  updateCustomer(body: types.UpdateCustomerBodyParam, metadata: types.UpdateCustomerMetadataParam): Promise<FetchResponse<202, types.UpdateCustomerResponse202>> {
    return this.core.fetch('/api/customers/{id}', 'put', body, metadata);
  }

  /**
   * Merge two customers according to the data sent in the payload. The data of the source
   * customer will be merged into the target customer and then deleted.
   * In case both customers have data for the same integration a conflict will occur with the
   * API returning an error.
   *
   *
   * @summary Merge two customers
   */
  mergeCustomers(body: types.MergeCustomersBodyParam, metadata: types.MergeCustomersMetadataParam): Promise<FetchResponse<202, types.MergeCustomersResponse202>> {
    return this.core.fetch('/api/customers/merge', 'put', body, metadata);
  }

  /**
   * Set a customer's data.
   *
   * @summary Set customer data
   */
  updateCustomerData(body: types.UpdateCustomerDataBodyParam, metadata: types.UpdateCustomerDataMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/customers/{customer_id}/data', 'put', body, metadata);
  }

  /**
   * Create a custom field
   *
   */
  createCustomField(body: types.CreateCustomFieldBodyParam): Promise<FetchResponse<201, types.CreateCustomFieldResponse201>> {
    return this.core.fetch('/api/custom-fields', 'post', body);
  }

  /**
   * List custom fields matching the given parameters, paginated, and ordered.
   *
   * @summary List custom fields
   */
  listCustomFields(metadata: types.ListCustomFieldsMetadataParam): Promise<FetchResponse<200, types.ListCustomFieldsResponse200>> {
    return this.core.fetch('/api/custom-fields', 'get', metadata);
  }

  /**
   * Bulk update a list of custom fields
   *
   */
  updateCustomFields(body: types.UpdateCustomFieldsBodyParam): Promise<FetchResponse<202, types.UpdateCustomFieldsResponse202>> {
    return this.core.fetch('/api/custom-fields', 'put', body);
  }

  /**
   * Retrieve a custom field
   *
   */
  getCustomField(metadata: types.GetCustomFieldMetadataParam): Promise<FetchResponse<200, types.GetCustomFieldResponse200>> {
    return this.core.fetch('/api/custom-fields/{id}', 'get', metadata);
  }

  /**
   * Update a custom field
   *
   */
  updateCustomField(body: types.UpdateCustomFieldBodyParam, metadata: types.UpdateCustomFieldMetadataParam): Promise<FetchResponse<202, types.UpdateCustomFieldResponse202>> {
    return this.core.fetch('/api/custom-fields/{id}', 'put', body, metadata);
  }

  /**
   * Retrieve an event
   *
   */
  getEvent(metadata: types.GetEventMetadataParam): Promise<FetchResponse<200, types.GetEventResponse200>> {
    return this.core.fetch('/api/events/{id}', 'get', metadata);
  }

  /**
   * List events, paginated, and ordered by their creation date, with the most recently
   * created first.
   *
   * @summary List events
   */
  listEvents(metadata?: types.ListEventsMetadataParam): Promise<FetchResponse<200, types.ListEventsResponse200>> {
    return this.core.fetch('/api/events', 'get', metadata);
  }

  /**
   * You can upload several files at a time by adding parameters to the root of the request
   * body. The name of each parameter will be used as the label of the file once uploaded.
   * E.g:
   *   - parameter name: `package-damaged.png`
   *   - parameter value: Content of the file.
   *
   *
   * @summary Upload files
   */
  postApiUpload(body: types.PostApiUploadBodyParam, metadata?: types.PostApiUploadMetadataParam): Promise<FetchResponse<201, types.PostApiUploadResponse201>> {
    return this.core.fetch('/api/upload', 'post', body, metadata);
  }

  /**
   * Download a private file given its resource identifier. The identifier can be extracted
   * from the URL of an attachment by removing the domain part and keeping the rest.
   *
   * @summary Download a file
   */
  downloadFile(metadata: types.DownloadFileMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/{file_type}/download/{domain_hash}/{resource_name}', 'get', metadata);
  }

  /**
   * Create an integration
   *
   */
  createIntegration(body: types.CreateIntegrationBodyParam): Promise<FetchResponse<201, types.CreateIntegrationResponse201>> {
    return this.core.fetch('/api/integrations', 'post', body);
  }

  /**
   * List integrations matching the given parameters, paginated.
   *
   * @summary List integrations
   */
  listIntegrations(metadata?: types.ListIntegrationsMetadataParam): Promise<FetchResponse<200, types.ListIntegrationsResponse200>> {
    return this.core.fetch('/api/integrations', 'get', metadata);
  }

  /**
   * Delete an integration. Any views that use this integration will be deactivated.
   * Integrations currently used in rules and/or other integrations cannot be deleted.
   *
   *
   * @summary Delete an integration
   */
  deleteIntegration(metadata: types.DeleteIntegrationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/integrations/{id}', 'delete', metadata);
  }

  /**
   * Retrieve an integration
   *
   */
  getIntegration(metadata: types.GetIntegrationMetadataParam): Promise<FetchResponse<200, types.GetIntegrationResponse200>> {
    return this.core.fetch('/api/integrations/{id}', 'get', metadata);
  }

  /**
   * Update an integration
   *
   */
  updateIntegration(body: types.UpdateIntegrationBodyParam, metadata: types.UpdateIntegrationMetadataParam): Promise<FetchResponse<202, types.UpdateIntegrationResponse202>> {
    return this.core.fetch('/api/integrations/{id}', 'put', body, metadata);
  }

  /**
   * Create a job and schedule its execution. Jobs are processed asynchronously, meaning that
   * once a job is created, it will run in background on Gorgias's servers. According to the
   * type and size of the task, a job can take a few minutes or several hours to be executed.
   * You can use our API to check the status of the job.
   *
   *
   * @summary Create a job
   */
  createJob(body: types.CreateJobBodyParam): Promise<FetchResponse<201, types.CreateJobResponse201>> {
    return this.core.fetch('/api/jobs', 'post', body);
  }

  /**
   * List jobs, paginated and ordered by their creation date, with the most recent ones
   * first.
   *
   *
   * @summary List jobs
   */
  listJobs(metadata?: types.ListJobsMetadataParam): Promise<FetchResponse<200, types.ListJobsResponse200>> {
    return this.core.fetch('/api/jobs', 'get', metadata);
  }

  /**
   * Jobs can be canceled at any time but be aware that if a job already started, changes
   * done by this one won't be reverted. For example, if you created a job to close 10k
   * tickets and you cancel it at some point, these closed tickets won't be reopened.
   *
   *
   * @summary Cancel a job
   */
  cancelJob(metadata: types.CancelJobMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/jobs/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a job
   *
   */
  getJob(metadata: types.GetJobMetadataParam): Promise<FetchResponse<202, types.GetJobResponse202>> {
    return this.core.fetch('/api/jobs/{id}', 'get', metadata);
  }

  /**
   * Update a job
   *
   */
  updateJob(body: types.UpdateJobBodyParam, metadata: types.UpdateJobMetadataParam): Promise<FetchResponse<202, types.UpdateJobResponse202>> {
    return this.core.fetch('/api/jobs/{id}', 'put', body, metadata);
  }

  /**
   * Create a macro
   *
   */
  createMacro(body: types.CreateMacroBodyParam): Promise<FetchResponse<201, types.CreateMacroResponse201>> {
    return this.core.fetch('/api/macros', 'post', body);
  }

  /**
   * List macros
   *
   */
  listMacros(metadata?: types.ListMacrosMetadataParam): Promise<FetchResponse<200, types.ListMacrosResponse200>> {
    return this.core.fetch('/api/macros', 'get', metadata);
  }

  /**
   * Delete a macro
   *
   */
  deleteMacro(metadata: types.DeleteMacroMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/macros/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a macro
   *
   */
  getMacro(metadata: types.GetMacroMetadataParam): Promise<FetchResponse<200, types.GetMacroResponse200>> {
    return this.core.fetch('/api/macros/{id}', 'get', metadata);
  }

  /**
   * Update a macro
   *
   */
  updateMacro(body: types.UpdateMacroBodyParam, metadata: types.UpdateMacroMetadataParam): Promise<FetchResponse<202, types.UpdateMacroResponse202>> {
    return this.core.fetch('/api/macros/{id}', 'put', body, metadata);
  }

  /**
   * Create a rule
   *
   */
  createRule(body: types.CreateRuleBodyParam): Promise<FetchResponse<201, types.CreateRuleResponse201>> {
    return this.core.fetch('/api/rules', 'post', body);
  }

  /**
   * List rules, paginated.
   *
   * @summary List rules
   */
  listRules(metadata?: types.ListRulesMetadataParam): Promise<FetchResponse<200, types.ListRulesResponse200>> {
    return this.core.fetch('/api/rules', 'get', metadata);
  }

  /**
   * Delete a rule
   *
   */
  deleteRule(metadata: types.DeleteRuleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/rules/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a rule
   *
   */
  getRule(metadata: types.GetRuleMetadataParam): Promise<FetchResponse<200, types.GetRuleResponse200>> {
    return this.core.fetch('/api/rules/{id}', 'get', metadata);
  }

  /**
   * Update a rule
   *
   */
  updateRule(body: types.UpdateRuleBodyParam, metadata: types.UpdateRuleMetadataParam): Promise<FetchResponse<202, types.UpdateRuleResponse202>> {
    return this.core.fetch('/api/rules/{id}', 'put', body, metadata);
  }

  /**
   * Update rules' priorities
   *
   */
  updateRulesPriorities(body: types.UpdateRulesPrioritiesBodyParam): Promise<FetchResponse<202, types.UpdateRulesPrioritiesResponse202>> {
    return this.core.fetch('/api/rules/priorities', 'post', body);
  }

  /**
   * Create a new satisfaction survey. If you don't want the satisfaction survey to be sent
   * by Gorgias set `should_send_datetime` parameter to `null`.
   *
   *
   * @summary Create a survey
   */
  createSatisfactionSurvey(body: types.CreateSatisfactionSurveyBodyParam): Promise<FetchResponse<201, types.CreateSatisfactionSurveyResponse201>> {
    return this.core.fetch('/api/satisfaction-surveys', 'post', body);
  }

  /**
   * List surveys, paginated and ordered by their creation date, with the most recently
   * created  first.
   *
   *
   * @summary List surveys
   */
  listSatisfactionSurveys(metadata?: types.ListSatisfactionSurveysMetadataParam): Promise<FetchResponse<200, types.ListSatisfactionSurveysResponse200>> {
    return this.core.fetch('/api/satisfaction-surveys', 'get', metadata);
  }

  /**
   * Retrieve a survey
   *
   * @summary Retrieve a survey
   */
  getSatisfactionSurvey(metadata: types.GetSatisfactionSurveyMetadataParam): Promise<FetchResponse<200, types.GetSatisfactionSurveyResponse200>> {
    return this.core.fetch('/api/satisfaction-surveys/{id}', 'get', metadata);
  }

  /**
   * Update a survey
   *
   */
  updateSatisfactionSurvey(body: types.UpdateSatisfactionSurveyBodyParam, metadata: types.UpdateSatisfactionSurveyMetadataParam): Promise<FetchResponse<202, types.UpdateSatisfactionSurveyResponse202>> {
    return this.core.fetch('/api/satisfaction-surveys/{id}', 'put', body, metadata);
  }

  /**
   * Search for resources
   *
   */
  search(body: types.SearchBodyParam): Promise<FetchResponse<201, types.SearchResponse201>> {
    return this.core.fetch('/api/search', 'post', body);
  }

  /**
   * Create a user
   *
   */
  createUser(body: types.CreateUserBodyParam): Promise<FetchResponse<201, types.CreateUserResponse201>> {
    return this.core.fetch('/api/users', 'post', body);
  }

  /**
   * List users, paginated and ordered by their name (alphabetical order).
   *
   *
   * @summary List users
   */
  listUsers(metadata?: types.ListUsersMetadataParam): Promise<FetchResponse<200, types.ListUsersResponse200>> {
    return this.core.fetch('/api/users', 'get', metadata);
  }

  /**
   * Delete a user
   *
   */
  deleteUser(metadata: types.DeleteUserMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/users/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a user
   *
   */
  getUser(metadata: types.GetUserMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/users/{id}', 'get', metadata);
  }

  /**
   * Update a user
   *
   */
  updateUser(body: types.UpdateUserBodyParam, metadata: types.UpdateUserMetadataParam): Promise<FetchResponse<202, types.UpdateUserResponse202>> {
    return this.core.fetch('/api/users/{id}', 'put', body, metadata);
  }

  /**
   * Create a team
   *
   */
  createTeam(body: types.CreateTeamBodyParam): Promise<FetchResponse<201, types.CreateTeamResponse201>> {
    return this.core.fetch('/api/teams', 'post', body);
  }

  /**
   * List teams matching the given parameters, paginated, and ordered.
   *
   * @summary List teams
   */
  listTeams(metadata?: types.ListTeamsMetadataParam): Promise<FetchResponse<200, types.ListTeamsResponse200>> {
    return this.core.fetch('/api/teams', 'get', metadata);
  }

  /**
   * Delete a team
   *
   */
  deleteTeam(metadata: types.DeleteTeamMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/teams/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a team
   *
   */
  getTeam(metadata: types.GetTeamMetadataParam): Promise<FetchResponse<200, types.GetTeamResponse200>> {
    return this.core.fetch('/api/teams/{id}', 'get', metadata);
  }

  /**
   * Update a team
   *
   */
  updateTeam(body: types.UpdateTeamBodyParam, metadata: types.UpdateTeamMetadataParam): Promise<FetchResponse<202, types.UpdateTeamResponse202>> {
    return this.core.fetch('/api/teams/{id}', 'put', body, metadata);
  }

  /**
   * Create a tag
   *
   */
  createTag(body: types.CreateTagBodyParam): Promise<FetchResponse<201, types.CreateTagResponse201>> {
    return this.core.fetch('/api/tags', 'post', body);
  }

  /**
   * Delete a list of tags. Any views that use this tag will be deactivated. Tags currently
   * used in macros and/or rules cannot be deleted.
   *
   *
   * @summary Delete tags
   */
  deleteTags(body: types.DeleteTagsBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tags', 'delete', body);
  }

  /**
   * List tags matching the given parameters, paginated, and ordered.
   *
   * @summary List tags
   */
  listTags(metadata?: types.ListTagsMetadataParam): Promise<FetchResponse<200, types.ListTagsResponse200>> {
    return this.core.fetch('/api/tags', 'get', metadata);
  }

  /**
   * Delete a tag. Any views that use this tag will be deactivated. Tags currently used in
   * macros and/or rules cannot be deleted.
   *
   *
   * @summary Delete a tag
   */
  deleteTag(metadata: types.DeleteTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tags/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a tag
   *
   */
  getTag(metadata: types.GetTagMetadataParam): Promise<FetchResponse<200, types.GetTagResponse200>> {
    return this.core.fetch('/api/tags/{id}', 'get', metadata);
  }

  /**
   * Update a tag
   *
   */
  updateTag(body: types.UpdateTagBodyParam, metadata: types.UpdateTagMetadataParam): Promise<FetchResponse<202, types.UpdateTagResponse202>> {
    return this.core.fetch('/api/tags/{id}', 'put', body, metadata);
  }

  /**
   * Merge one or more tags into another tag. Source tags will be merged into the destination
   * tag and then deleted.
   *
   *
   * @summary Merge tags
   */
  mergeTags(body: types.MergeTagsBodyParam, metadata: types.MergeTagsMetadataParam): Promise<FetchResponse<202, types.MergeTagsResponse202>> {
    return this.core.fetch('/api/tags/{destination_tag_id}/merge', 'put', body, metadata);
  }

  /**
   * Create a ticket
   *
   */
  createTicket(body: types.CreateTicketBodyParam): Promise<FetchResponse<201, types.CreateTicketResponse201>> {
    return this.core.fetch('/api/tickets', 'post', body);
  }

  /**
   * List tickets, paginated and ordered by the attribute of the given view.
   *
   *
   * @summary List tickets
   */
  listTickets(metadata?: types.ListTicketsMetadataParam): Promise<FetchResponse<200, types.ListTicketsResponse200>> {
    return this.core.fetch('/api/tickets', 'get', metadata);
  }

  /**
   * Delete a ticket
   *
   */
  deleteTicket(metadata: types.DeleteTicketMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a ticket
   *
   */
  getTicket(metadata: types.GetTicketMetadataParam): Promise<FetchResponse<200, types.GetTicketResponse200>> {
    return this.core.fetch('/api/tickets/{id}', 'get', metadata);
  }

  /**
   * Update a ticket
   *
   */
  updateTicket(body: types.UpdateTicketBodyParam, metadata: types.UpdateTicketMetadataParam): Promise<FetchResponse<202, types.UpdateTicketResponse202>> {
    return this.core.fetch('/api/tickets/{id}', 'put', body, metadata);
  }

  /**
   * Create a message and either:
   *   - not send it if the attribute `sent_datetime` is filled.
   *   If you import a message that was already sent, make sure to set this value.
   *   - send it to the recipients if the attribute `sent_datetime` is empty.
   *   - add it to the ticket as an internal note if you specified this channel.
   *   Internal notes are not sent to your customers.
   *
   * When a message is created, it does not mean that this one has been sent because the
   * creation and sending process are decoupled. Messages are basically sent asynchronously.
   * Once a message has been sent, Gorgias will automatically update the message to fill the
   * time when it was sent (`sent_datetime`).
   *
   *
   * @summary Create a message
   */
  createTicketMessage(body: types.CreateTicketMessageBodyParam, metadata: types.CreateTicketMessageMetadataParam): Promise<FetchResponse<201, types.CreateTicketMessageResponse201>> {
    return this.core.fetch('/api/tickets/{ticket_id}/messages', 'post', body, metadata);
  }

  /**
   * List all messages of a ticket, ordered by their sending date, with the oldest messages
   * first.<br> <span style="color:red">This endpoint has been deprecated.</span> Use [list
   * messages](/reference/list-messages) endpoint instead.
   *
   *
   * @summary List messages of a ticket
   */
  listTicketMessages(metadata: types.ListTicketMessagesMetadataParam): Promise<FetchResponse<200, types.ListTicketMessagesResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/messages', 'get', metadata);
  }

  /**
   * Delete a message
   *
   */
  deleteTicketMessage(metadata: types.DeleteTicketMessageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{ticket_id}/messages/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a message
   *
   */
  getTicketMessage(metadata: types.GetTicketMessageMetadataParam): Promise<FetchResponse<200, types.GetTicketMessageResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/messages/{id}', 'get', metadata);
  }

  /**
   * Update a message
   *
   */
  updateTicketMessage(body: types.UpdateTicketMessageBodyParam, metadata: types.UpdateTicketMessageMetadataParam): Promise<FetchResponse<202, types.UpdateTicketMessageResponse202>> {
    return this.core.fetch('/api/tickets/{ticket_id}/messages/{id}', 'put', body, metadata);
  }

  /**
   * Add tags to a ticket.
   *
   * @summary Add ticket tags
   */
  createTicketTags(body: types.CreateTicketTagsBodyParam, metadata: types.CreateTicketTagsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{ticket_id}/tags', 'post', body, metadata);
  }

  /**
   * Remove tags from a ticket.
   *
   * @summary Remove ticket tags
   */
  deleteTicketTags(body: types.DeleteTicketTagsBodyParam, metadata: types.DeleteTicketTagsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{ticket_id}/tags', 'delete', body, metadata);
  }

  /**
   * List all tags for a ticket.
   *
   * @summary List ticket tags
   */
  getApiTicketsTicket_idTags(metadata: types.GetApiTicketsTicketIdTagsMetadataParam): Promise<FetchResponse<200, types.GetApiTicketsTicketIdTagsResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/tags', 'get', metadata);
  }

  /**
   * Set a ticket's tags.
   *
   * @summary Set ticket tags
   */
  updateTicketTags(body: types.UpdateTicketTagsBodyParam, metadata: types.UpdateTicketTagsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{ticket_id}/tags', 'put', body, metadata);
  }

  /**
   * Delete a ticket's custom field value.
   *
   * @summary Delete ticket field value
   */
  deleteTicketCustomField(metadata: types.DeleteTicketCustomFieldMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/tickets/{ticket_id}/custom-fields/{id}', 'delete', metadata);
  }

  /**
   * Update a ticket's custom field value.
   *
   * @summary Update ticket field value
   */
  updateTicketCustomField(body: types.UpdateTicketCustomFieldBodyParam, metadata: types.UpdateTicketCustomFieldMetadataParam): Promise<FetchResponse<200, types.UpdateTicketCustomFieldResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/custom-fields/{id}', 'put', body, metadata);
  }

  /**
   * List all custom fields for a ticket.
   *
   * @summary List ticket field values
   */
  listTicketCustomFields(metadata: types.ListTicketCustomFieldsMetadataParam): Promise<FetchResponse<200, types.ListTicketCustomFieldsResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/custom-fields', 'get', metadata);
  }

  /**
   * Update a ticket's custom fields values.
   *
   * @summary Update ticket fields values
   */
  updateTicketCustomFields(body: types.UpdateTicketCustomFieldsBodyParam, metadata: types.UpdateTicketCustomFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateTicketCustomFieldsResponse200>> {
    return this.core.fetch('/api/tickets/{ticket_id}/custom-fields', 'put', body, metadata);
  }

  /**
   * List messages matching the given parameters, paginated.
   *
   * @summary List messages
   */
  listMessages(metadata?: types.ListMessagesMetadataParam): Promise<FetchResponse<200, types.ListMessagesResponse200>> {
    return this.core.fetch('/api/messages', 'get', metadata);
  }

  /**
   * Retrieve a statistic
   *
   */
  postApiStatsName(body: types.PostApiStatsNameBodyParam, metadata: types.PostApiStatsNameMetadataParam): Promise<FetchResponse<201, types.PostApiStatsNameResponse201>> {
    return this.core.fetch('/api/stats/{name}', 'post', body, metadata);
  }

  /**
   * Download CSV-formatted data of a statistic.
   *
   * @summary Download a statistic
   */
  postApiStatsNameDownload(body: types.PostApiStatsNameDownloadBodyParam, metadata: types.PostApiStatsNameDownloadMetadataParam): Promise<FetchResponse<201, types.PostApiStatsNameDownloadResponse201>> {
    return this.core.fetch('/api/stats/{name}/download', 'post', body, metadata);
  }

  /**
   * Create a view
   *
   */
  createView(body: types.CreateViewBodyParam): Promise<FetchResponse<201, types.CreateViewResponse201>> {
    return this.core.fetch('/api/views', 'post', body);
  }

  /**
   * List all views ordered by their `id` attribute. Current user variables
   * (`{{current_user...}}`) present in views' filters will be replaced with the information
   * of the user listing views.
   *
   *
   * @summary List views
   */
  listViews(metadata?: types.ListViewsMetadataParam): Promise<FetchResponse<200, types.ListViewsResponse200>> {
    return this.core.fetch('/api/views', 'get', metadata);
  }

  /**
   * Delete a view
   *
   */
  deleteView(metadata: types.DeleteViewMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/views/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a view
   *
   */
  getView(metadata: types.GetViewMetadataParam): Promise<FetchResponse<200, types.GetViewResponse200>> {
    return this.core.fetch('/api/views/{id}', 'get', metadata);
  }

  /**
   * Update a view
   *
   */
  updateView(body: types.UpdateViewBodyParam, metadata: types.UpdateViewMetadataParam): Promise<FetchResponse<202, types.UpdateViewResponse202>> {
    return this.core.fetch('/api/views/{id}', 'put', body, metadata);
  }

  /**
   * List view's items, paginated, and ordered by the attribute specified in the data of
   * view.
   *
   * @summary List view's items
   */
  listViewItems(metadata: types.ListViewItemsMetadataParam): Promise<FetchResponse<200, types.ListViewItemsResponse200>> {
    return this.core.fetch('/api/views/{view_id}/items', 'get', metadata);
  }

  /**
   * List view's items, paginated, and ordered by the attribute specified in the data of
   * view.
   *
   * @summary Search for view's items
   */
  updateViewItems(body: types.UpdateViewItemsBodyParam, metadata: types.UpdateViewItemsMetadataParam): Promise<FetchResponse<202, types.UpdateViewItemsResponse202>> {
    return this.core.fetch('/api/views/{view_id}/items', 'put', body, metadata);
  }

  /**
   * Retrieve a voice call
   *
   */
  getVoiceCall(metadata: types.GetVoiceCallMetadataParam): Promise<FetchResponse<200, types.GetVoiceCallResponse200>> {
    return this.core.fetch('/api/phone/voice-calls/{id}', 'get', metadata);
  }

  /**
   * List voice calls matching the given parameters, paginated, and ordered.
   *
   * @summary List voice calls
   */
  listVoiceCalls(metadata?: types.ListVoiceCallsMetadataParam): Promise<FetchResponse<200, types.ListVoiceCallsResponse200>> {
    return this.core.fetch('/api/phone/voice-calls', 'get', metadata);
  }

  /**
   * Delete a voice call recording
   *
   */
  deleteVoiceCallRecording(metadata: types.DeleteVoiceCallRecordingMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/phone/voice-call-recordings/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a voice call recording
   *
   */
  getVoiceCallRecording(metadata: types.GetVoiceCallRecordingMetadataParam): Promise<FetchResponse<200, types.GetVoiceCallRecordingResponse200>> {
    return this.core.fetch('/api/phone/voice-call-recordings/{id}', 'get', metadata);
  }

  /**
   * List voice call recordings matching the given parameters, paginated, and ordered.
   *
   * @summary List voice call recordings
   */
  listVoiceCallRecordings(metadata?: types.ListVoiceCallRecordingsMetadataParam): Promise<FetchResponse<200, types.ListVoiceCallRecordingsResponse200>> {
    return this.core.fetch('/api/phone/voice-call-recordings', 'get', metadata);
  }

  /**
   * Retrieve a voice call event
   *
   */
  getVoiceCallEvent(metadata: types.GetVoiceCallEventMetadataParam): Promise<FetchResponse<200, types.GetVoiceCallEventResponse200>> {
    return this.core.fetch('/api/phone/voice-call-events/{id}', 'get', metadata);
  }

  /**
   * List voice call events matching the given parameters, paginated, and ordered.
   *
   * @summary List voice call events
   */
  listVoiceCallEvents(metadata?: types.ListVoiceCallEventsMetadataParam): Promise<FetchResponse<200, types.ListVoiceCallEventsResponse200>> {
    return this.core.fetch('/api/phone/voice-call-events', 'get', metadata);
  }

  /**
   * Create a widget
   *
   */
  createWidget(body: types.CreateWidgetBodyParam): Promise<FetchResponse<201, types.CreateWidgetResponse201>> {
    return this.core.fetch('/api/widgets', 'post', body);
  }

  /**
   * List all widgets for the account, ordered.
   *
   * @summary List widgets
   */
  listWidgets(metadata?: types.ListWidgetsMetadataParam): Promise<FetchResponse<200, types.ListWidgetsResponse200>> {
    return this.core.fetch('/api/widgets', 'get', metadata);
  }

  /**
   * Delete a widget
   *
   */
  deleteWidget(metadata: types.DeleteWidgetMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api/widgets/{id}', 'delete', metadata);
  }

  /**
   * Retrieve a widget
   *
   */
  getWidget(metadata: types.GetWidgetMetadataParam): Promise<FetchResponse<200, types.GetWidgetResponse200>> {
    return this.core.fetch('/api/widgets/{id}', 'get', metadata);
  }

  /**
   * Update a widget
   *
   */
  updateWidget(body: types.UpdateWidgetBodyParam, metadata: types.UpdateWidgetMetadataParam): Promise<FetchResponse<202, types.UpdateWidgetResponse202>> {
    return this.core.fetch('/api/widgets/{id}', 'put', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CancelJobMetadataParam, CreateAccountSettingBodyParam, CreateAccountSettingResponse201, CreateCustomFieldBodyParam, CreateCustomFieldResponse201, CreateCustomerBodyParam, CreateCustomerResponse201, CreateIntegrationBodyParam, CreateIntegrationResponse201, CreateJobBodyParam, CreateJobResponse201, CreateMacroBodyParam, CreateMacroResponse201, CreateRuleBodyParam, CreateRuleResponse201, CreateSatisfactionSurveyBodyParam, CreateSatisfactionSurveyResponse201, CreateTagBodyParam, CreateTagResponse201, CreateTeamBodyParam, CreateTeamResponse201, CreateTicketBodyParam, CreateTicketMessageBodyParam, CreateTicketMessageMetadataParam, CreateTicketMessageResponse201, CreateTicketResponse201, CreateTicketTagsBodyParam, CreateTicketTagsMetadataParam, CreateUserBodyParam, CreateUserResponse201, CreateViewBodyParam, CreateViewResponse201, CreateWidgetBodyParam, CreateWidgetResponse201, DeleteCustomerMetadataParam, DeleteCustomersBodyParam, DeleteIntegrationMetadataParam, DeleteMacroMetadataParam, DeleteRuleMetadataParam, DeleteTagMetadataParam, DeleteTagsBodyParam, DeleteTeamMetadataParam, DeleteTicketCustomFieldMetadataParam, DeleteTicketMessageMetadataParam, DeleteTicketMetadataParam, DeleteTicketTagsBodyParam, DeleteTicketTagsMetadataParam, DeleteUserMetadataParam, DeleteViewMetadataParam, DeleteVoiceCallRecordingMetadataParam, DeleteWidgetMetadataParam, DownloadFileMetadataParam, GetAccountResponse200, GetApiTicketsTicketIdTagsMetadataParam, GetApiTicketsTicketIdTagsResponse200, GetCustomFieldMetadataParam, GetCustomFieldResponse200, GetCustomerMetadataParam, GetCustomerResponse200, GetEventMetadataParam, GetEventResponse200, GetIntegrationMetadataParam, GetIntegrationResponse200, GetJobMetadataParam, GetJobResponse202, GetMacroMetadataParam, GetMacroResponse200, GetRuleMetadataParam, GetRuleResponse200, GetSatisfactionSurveyMetadataParam, GetSatisfactionSurveyResponse200, GetTagMetadataParam, GetTagResponse200, GetTeamMetadataParam, GetTeamResponse200, GetTicketMessageMetadataParam, GetTicketMessageResponse200, GetTicketMetadataParam, GetTicketResponse200, GetUserMetadataParam, GetViewMetadataParam, GetViewResponse200, GetVoiceCallEventMetadataParam, GetVoiceCallEventResponse200, GetVoiceCallMetadataParam, GetVoiceCallRecordingMetadataParam, GetVoiceCallRecordingResponse200, GetVoiceCallResponse200, GetWidgetMetadataParam, GetWidgetResponse200, ListAccountSettingsMetadataParam, ListAccountSettingsResponse200, ListCustomFieldsMetadataParam, ListCustomFieldsResponse200, ListCustomersMetadataParam, ListCustomersResponse200, ListEventsMetadataParam, ListEventsResponse200, ListIntegrationsMetadataParam, ListIntegrationsResponse200, ListJobsMetadataParam, ListJobsResponse200, ListMacrosMetadataParam, ListMacrosResponse200, ListMessagesMetadataParam, ListMessagesResponse200, ListRulesMetadataParam, ListRulesResponse200, ListSatisfactionSurveysMetadataParam, ListSatisfactionSurveysResponse200, ListTagsMetadataParam, ListTagsResponse200, ListTeamsMetadataParam, ListTeamsResponse200, ListTicketCustomFieldsMetadataParam, ListTicketCustomFieldsResponse200, ListTicketMessagesMetadataParam, ListTicketMessagesResponse200, ListTicketsMetadataParam, ListTicketsResponse200, ListUsersMetadataParam, ListUsersResponse200, ListViewItemsMetadataParam, ListViewItemsResponse200, ListViewsMetadataParam, ListViewsResponse200, ListVoiceCallEventsMetadataParam, ListVoiceCallEventsResponse200, ListVoiceCallRecordingsMetadataParam, ListVoiceCallRecordingsResponse200, ListVoiceCallsMetadataParam, ListVoiceCallsResponse200, ListWidgetsMetadataParam, ListWidgetsResponse200, MergeCustomersBodyParam, MergeCustomersMetadataParam, MergeCustomersResponse202, MergeTagsBodyParam, MergeTagsMetadataParam, MergeTagsResponse202, PostApiStatsNameBodyParam, PostApiStatsNameDownloadBodyParam, PostApiStatsNameDownloadMetadataParam, PostApiStatsNameDownloadResponse201, PostApiStatsNameMetadataParam, PostApiStatsNameResponse201, PostApiUploadBodyParam, PostApiUploadMetadataParam, PostApiUploadResponse201, SearchBodyParam, SearchResponse201, UpdateAccountSettingBodyParam, UpdateAccountSettingMetadataParam, UpdateAccountSettingResponse200, UpdateCustomFieldBodyParam, UpdateCustomFieldMetadataParam, UpdateCustomFieldResponse202, UpdateCustomFieldsBodyParam, UpdateCustomFieldsResponse202, UpdateCustomerBodyParam, UpdateCustomerDataBodyParam, UpdateCustomerDataMetadataParam, UpdateCustomerMetadataParam, UpdateCustomerResponse202, UpdateIntegrationBodyParam, UpdateIntegrationMetadataParam, UpdateIntegrationResponse202, UpdateJobBodyParam, UpdateJobMetadataParam, UpdateJobResponse202, UpdateMacroBodyParam, UpdateMacroMetadataParam, UpdateMacroResponse202, UpdateRuleBodyParam, UpdateRuleMetadataParam, UpdateRuleResponse202, UpdateRulesPrioritiesBodyParam, UpdateRulesPrioritiesResponse202, UpdateSatisfactionSurveyBodyParam, UpdateSatisfactionSurveyMetadataParam, UpdateSatisfactionSurveyResponse202, UpdateTagBodyParam, UpdateTagMetadataParam, UpdateTagResponse202, UpdateTeamBodyParam, UpdateTeamMetadataParam, UpdateTeamResponse202, UpdateTicketBodyParam, UpdateTicketCustomFieldBodyParam, UpdateTicketCustomFieldMetadataParam, UpdateTicketCustomFieldResponse200, UpdateTicketCustomFieldsBodyParam, UpdateTicketCustomFieldsMetadataParam, UpdateTicketCustomFieldsResponse200, UpdateTicketMessageBodyParam, UpdateTicketMessageMetadataParam, UpdateTicketMessageResponse202, UpdateTicketMetadataParam, UpdateTicketResponse202, UpdateTicketTagsBodyParam, UpdateTicketTagsMetadataParam, UpdateUserBodyParam, UpdateUserMetadataParam, UpdateUserResponse202, UpdateViewBodyParam, UpdateViewItemsBodyParam, UpdateViewItemsMetadataParam, UpdateViewItemsResponse202, UpdateViewMetadataParam, UpdateViewResponse202, UpdateWidgetBodyParam, UpdateWidgetMetadataParam, UpdateWidgetResponse202 } from './types';

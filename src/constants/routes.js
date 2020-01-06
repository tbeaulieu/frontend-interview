export const HOME_ROUTE = "/";
export const VIEW_ROUTE = "/:id";
export const REPOSITORIES_ROUTE = "/repositories";
export const REPOSITORY_ID_ROUTE = `${REPOSITORIES_ROUTE}/:id`;
export const getRepositoryRoute = id => REPOSITORY_ID_ROUTE.replace(":id", id);
export const PROFILE_ROUTE = "/profile";

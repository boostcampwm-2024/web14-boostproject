/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as RequireLoginImport } from "./routes/require-login";
import { Route as RequireBettingRoomIdImport } from "./routes/require-bettingRoomId";
import { Route as MyPageImport } from "./routes/my-page";
import { Route as LoginImport } from "./routes/login";
import { Route as CreateVoteImport } from "./routes/create-vote";
import { Route as IndexImport } from "./routes/index";
import { Route as BettingIndexImport } from "./routes/betting.index";
import { Route as BettingRoomIdWaitingImport } from "./routes/betting_.$roomId.waiting";
import { Route as BettingRoomIdVoteImport } from "./routes/betting_.$roomId.vote";
import { Route as BettingRoomIdVoteVotingImport } from "./routes/betting_.$roomId.vote.voting";
import { Route as BettingRoomIdVoteResultDetailImport } from "./routes/betting_.$roomId.vote.resultDetail";
import { Route as BettingRoomIdVoteAdminImport } from "./routes/betting_.$roomId.vote.admin";

// Create/Update Routes

const RequireLoginRoute = RequireLoginImport.update({
  id: "/require-login",
  path: "/require-login",
  getParentRoute: () => rootRoute,
} as any);

const RequireBettingRoomIdRoute = RequireBettingRoomIdImport.update({
  id: "/require-bettingRoomId",
  path: "/require-bettingRoomId",
  getParentRoute: () => rootRoute,
} as any);

const MyPageRoute = MyPageImport.update({
  id: "/my-page",
  path: "/my-page",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const CreateVoteRoute = CreateVoteImport.update({
  id: "/create-vote",
  path: "/create-vote",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const BettingIndexRoute = BettingIndexImport.update({
  id: "/betting/",
  path: "/betting/",
  getParentRoute: () => rootRoute,
} as any);

const BettingRoomIdWaitingRoute = BettingRoomIdWaitingImport.update({
  id: "/betting_/$roomId/waiting",
  path: "/betting/$roomId/waiting",
  getParentRoute: () => rootRoute,
} as any);

const BettingRoomIdVoteRoute = BettingRoomIdVoteImport.update({
  id: "/betting_/$roomId/vote",
  path: "/betting/$roomId/vote",
  getParentRoute: () => rootRoute,
} as any);

const BettingRoomIdVoteVotingRoute = BettingRoomIdVoteVotingImport.update({
  id: "/voting",
  path: "/voting",
  getParentRoute: () => BettingRoomIdVoteRoute,
} as any);

const BettingRoomIdVoteResultDetailRoute =
  BettingRoomIdVoteResultDetailImport.update({
    id: "/resultDetail",
    path: "/resultDetail",
    getParentRoute: () => BettingRoomIdVoteRoute,
  } as any);

const BettingRoomIdVoteAdminRoute = BettingRoomIdVoteAdminImport.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => BettingRoomIdVoteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/create-vote": {
      id: "/create-vote";
      path: "/create-vote";
      fullPath: "/create-vote";
      preLoaderRoute: typeof CreateVoteImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/my-page": {
      id: "/my-page";
      path: "/my-page";
      fullPath: "/my-page";
      preLoaderRoute: typeof MyPageImport;
      parentRoute: typeof rootRoute;
    };
    "/require-bettingRoomId": {
      id: "/require-bettingRoomId";
      path: "/require-bettingRoomId";
      fullPath: "/require-bettingRoomId";
      preLoaderRoute: typeof RequireBettingRoomIdImport;
      parentRoute: typeof rootRoute;
    };
    "/require-login": {
      id: "/require-login";
      path: "/require-login";
      fullPath: "/require-login";
      preLoaderRoute: typeof RequireLoginImport;
      parentRoute: typeof rootRoute;
    };
    "/betting/": {
      id: "/betting/";
      path: "/betting";
      fullPath: "/betting";
      preLoaderRoute: typeof BettingIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/betting_/$roomId/vote": {
      id: "/betting_/$roomId/vote";
      path: "/betting/$roomId/vote";
      fullPath: "/betting/$roomId/vote";
      preLoaderRoute: typeof BettingRoomIdVoteImport;
      parentRoute: typeof rootRoute;
    };
    "/betting_/$roomId/waiting": {
      id: "/betting_/$roomId/waiting";
      path: "/betting/$roomId/waiting";
      fullPath: "/betting/$roomId/waiting";
      preLoaderRoute: typeof BettingRoomIdWaitingImport;
      parentRoute: typeof rootRoute;
    };
    "/betting_/$roomId/vote/admin": {
      id: "/betting_/$roomId/vote/admin";
      path: "/admin";
      fullPath: "/betting/$roomId/vote/admin";
      preLoaderRoute: typeof BettingRoomIdVoteAdminImport;
      parentRoute: typeof BettingRoomIdVoteImport;
    };
    "/betting_/$roomId/vote/resultDetail": {
      id: "/betting_/$roomId/vote/resultDetail";
      path: "/resultDetail";
      fullPath: "/betting/$roomId/vote/resultDetail";
      preLoaderRoute: typeof BettingRoomIdVoteResultDetailImport;
      parentRoute: typeof BettingRoomIdVoteImport;
    };
    "/betting_/$roomId/vote/voting": {
      id: "/betting_/$roomId/vote/voting";
      path: "/voting";
      fullPath: "/betting/$roomId/vote/voting";
      preLoaderRoute: typeof BettingRoomIdVoteVotingImport;
      parentRoute: typeof BettingRoomIdVoteImport;
    };
  }
}

// Create and export the route tree

interface BettingRoomIdVoteRouteChildren {
  BettingRoomIdVoteAdminRoute: typeof BettingRoomIdVoteAdminRoute;
  BettingRoomIdVoteResultDetailRoute: typeof BettingRoomIdVoteResultDetailRoute;
  BettingRoomIdVoteVotingRoute: typeof BettingRoomIdVoteVotingRoute;
}

const BettingRoomIdVoteRouteChildren: BettingRoomIdVoteRouteChildren = {
  BettingRoomIdVoteAdminRoute: BettingRoomIdVoteAdminRoute,
  BettingRoomIdVoteResultDetailRoute: BettingRoomIdVoteResultDetailRoute,
  BettingRoomIdVoteVotingRoute: BettingRoomIdVoteVotingRoute,
};

const BettingRoomIdVoteRouteWithChildren =
  BettingRoomIdVoteRoute._addFileChildren(BettingRoomIdVoteRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-bettingRoomId": typeof RequireBettingRoomIdRoute;
  "/require-login": typeof RequireLoginRoute;
  "/betting": typeof BettingIndexRoute;
  "/betting/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting/$roomId/vote/admin": typeof BettingRoomIdVoteAdminRoute;
  "/betting/$roomId/vote/resultDetail": typeof BettingRoomIdVoteResultDetailRoute;
  "/betting/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-bettingRoomId": typeof RequireBettingRoomIdRoute;
  "/require-login": typeof RequireLoginRoute;
  "/betting": typeof BettingIndexRoute;
  "/betting/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting/$roomId/vote/admin": typeof BettingRoomIdVoteAdminRoute;
  "/betting/$roomId/vote/resultDetail": typeof BettingRoomIdVoteResultDetailRoute;
  "/betting/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-bettingRoomId": typeof RequireBettingRoomIdRoute;
  "/require-login": typeof RequireLoginRoute;
  "/betting/": typeof BettingIndexRoute;
  "/betting_/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting_/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting_/$roomId/vote/admin": typeof BettingRoomIdVoteAdminRoute;
  "/betting_/$roomId/vote/resultDetail": typeof BettingRoomIdVoteResultDetailRoute;
  "/betting_/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-bettingRoomId"
    | "/require-login"
    | "/betting"
    | "/betting/$roomId/vote"
    | "/betting/$roomId/waiting"
    | "/betting/$roomId/vote/admin"
    | "/betting/$roomId/vote/resultDetail"
    | "/betting/$roomId/vote/voting";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-bettingRoomId"
    | "/require-login"
    | "/betting"
    | "/betting/$roomId/vote"
    | "/betting/$roomId/waiting"
    | "/betting/$roomId/vote/admin"
    | "/betting/$roomId/vote/resultDetail"
    | "/betting/$roomId/vote/voting";
  id:
    | "__root__"
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-bettingRoomId"
    | "/require-login"
    | "/betting/"
    | "/betting_/$roomId/vote"
    | "/betting_/$roomId/waiting"
    | "/betting_/$roomId/vote/admin"
    | "/betting_/$roomId/vote/resultDetail"
    | "/betting_/$roomId/vote/voting";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  CreateVoteRoute: typeof CreateVoteRoute;
  LoginRoute: typeof LoginRoute;
  MyPageRoute: typeof MyPageRoute;
  RequireBettingRoomIdRoute: typeof RequireBettingRoomIdRoute;
  RequireLoginRoute: typeof RequireLoginRoute;
  BettingIndexRoute: typeof BettingIndexRoute;
  BettingRoomIdVoteRoute: typeof BettingRoomIdVoteRouteWithChildren;
  BettingRoomIdWaitingRoute: typeof BettingRoomIdWaitingRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CreateVoteRoute: CreateVoteRoute,
  LoginRoute: LoginRoute,
  MyPageRoute: MyPageRoute,
  RequireBettingRoomIdRoute: RequireBettingRoomIdRoute,
  RequireLoginRoute: RequireLoginRoute,
  BettingIndexRoute: BettingIndexRoute,
  BettingRoomIdVoteRoute: BettingRoomIdVoteRouteWithChildren,
  BettingRoomIdWaitingRoute: BettingRoomIdWaitingRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create-vote",
        "/login",
        "/my-page",
        "/require-bettingRoomId",
        "/require-login",
        "/betting/",
        "/betting_/$roomId/vote",
        "/betting_/$roomId/waiting"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/create-vote": {
      "filePath": "create-vote.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/my-page": {
      "filePath": "my-page.tsx"
    },
    "/require-bettingRoomId": {
      "filePath": "require-bettingRoomId.tsx"
    },
    "/require-login": {
      "filePath": "require-login.tsx"
    },
    "/betting/": {
      "filePath": "betting.index.tsx"
    },
    "/betting_/$roomId/vote": {
      "filePath": "betting_.$roomId.vote.tsx",
      "children": [
        "/betting_/$roomId/vote/admin",
        "/betting_/$roomId/vote/resultDetail",
        "/betting_/$roomId/vote/voting"
      ]
    },
    "/betting_/$roomId/waiting": {
      "filePath": "betting_.$roomId.waiting.tsx"
    },
    "/betting_/$roomId/vote/admin": {
      "filePath": "betting_.$roomId.vote.admin.tsx",
      "parent": "/betting_/$roomId/vote"
    },
    "/betting_/$roomId/vote/resultDetail": {
      "filePath": "betting_.$roomId.vote.resultDetail.tsx",
      "parent": "/betting_/$roomId/vote"
    },
    "/betting_/$roomId/vote/voting": {
      "filePath": "betting_.$roomId.vote.voting.tsx",
      "parent": "/betting_/$roomId/vote"
    }
  }
}
ROUTE_MANIFEST_END */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as RequireRoomIdImport } from "./routes/require-roomId";
import { Route as RequireLoginImport } from "./routes/require-login";
import { Route as MyPageImport } from "./routes/my-page";
import { Route as LoginImport } from "./routes/login";
import { Route as CreateVoteImport } from "./routes/create-vote";
import { Route as IndexImport } from "./routes/index";
import { Route as BettingIndexImport } from "./routes/betting.index";
import { Route as PredictDetailUserTypeImport } from "./routes/predict-detail.$userType";
import { Route as BettingRoomIdWaitingImport } from "./routes/betting_.$roomId.waiting";
import { Route as BettingRoomIdVoteImport } from "./routes/betting_.$roomId.vote";
import { Route as BettingRoomIdVoteVotingImport } from "./routes/betting_.$roomId.vote.voting";
import { Route as BettingRoomIdVoteDetailResultImport } from "./routes/betting_.$roomId.vote.detailResult";
import { Route as BettingRoomIdVoteDecideImport } from "./routes/betting_.$roomId.vote.decide";

// Create/Update Routes

const RequireRoomIdRoute = RequireRoomIdImport.update({
  id: "/require-roomId",
  path: "/require-roomId",
  getParentRoute: () => rootRoute,
} as any);

const RequireLoginRoute = RequireLoginImport.update({
  id: "/require-login",
  path: "/require-login",
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

const PredictDetailUserTypeRoute = PredictDetailUserTypeImport.update({
  id: "/predict-detail/$userType",
  path: "/predict-detail/$userType",
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

const BettingRoomIdVoteDetailResultRoute =
  BettingRoomIdVoteDetailResultImport.update({
    id: "/detailResult",
    path: "/detailResult",
    getParentRoute: () => BettingRoomIdVoteRoute,
  } as any);

const BettingRoomIdVoteDecideRoute = BettingRoomIdVoteDecideImport.update({
  id: "/decide",
  path: "/decide",
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
    "/require-login": {
      id: "/require-login";
      path: "/require-login";
      fullPath: "/require-login";
      preLoaderRoute: typeof RequireLoginImport;
      parentRoute: typeof rootRoute;
    };
    "/require-roomId": {
      id: "/require-roomId";
      path: "/require-roomId";
      fullPath: "/require-roomId";
      preLoaderRoute: typeof RequireRoomIdImport;
      parentRoute: typeof rootRoute;
    };
    "/predict-detail/$userType": {
      id: "/predict-detail/$userType";
      path: "/predict-detail/$userType";
      fullPath: "/predict-detail/$userType";
      preLoaderRoute: typeof PredictDetailUserTypeImport;
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
    "/betting_/$roomId/vote/decide": {
      id: "/betting_/$roomId/vote/decide";
      path: "/decide";
      fullPath: "/betting/$roomId/vote/decide";
      preLoaderRoute: typeof BettingRoomIdVoteDecideImport;
      parentRoute: typeof BettingRoomIdVoteImport;
    };
    "/betting_/$roomId/vote/detailResult": {
      id: "/betting_/$roomId/vote/detailResult";
      path: "/detailResult";
      fullPath: "/betting/$roomId/vote/detailResult";
      preLoaderRoute: typeof BettingRoomIdVoteDetailResultImport;
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
  BettingRoomIdVoteDecideRoute: typeof BettingRoomIdVoteDecideRoute;
  BettingRoomIdVoteDetailResultRoute: typeof BettingRoomIdVoteDetailResultRoute;
  BettingRoomIdVoteVotingRoute: typeof BettingRoomIdVoteVotingRoute;
}

const BettingRoomIdVoteRouteChildren: BettingRoomIdVoteRouteChildren = {
  BettingRoomIdVoteDecideRoute: BettingRoomIdVoteDecideRoute,
  BettingRoomIdVoteDetailResultRoute: BettingRoomIdVoteDetailResultRoute,
  BettingRoomIdVoteVotingRoute: BettingRoomIdVoteVotingRoute,
};

const BettingRoomIdVoteRouteWithChildren =
  BettingRoomIdVoteRoute._addFileChildren(BettingRoomIdVoteRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-login": typeof RequireLoginRoute;
  "/require-roomId": typeof RequireRoomIdRoute;
  "/predict-detail/$userType": typeof PredictDetailUserTypeRoute;
  "/betting": typeof BettingIndexRoute;
  "/betting/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting/$roomId/vote/decide": typeof BettingRoomIdVoteDecideRoute;
  "/betting/$roomId/vote/detailResult": typeof BettingRoomIdVoteDetailResultRoute;
  "/betting/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-login": typeof RequireLoginRoute;
  "/require-roomId": typeof RequireRoomIdRoute;
  "/predict-detail/$userType": typeof PredictDetailUserTypeRoute;
  "/betting": typeof BettingIndexRoute;
  "/betting/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting/$roomId/vote/decide": typeof BettingRoomIdVoteDecideRoute;
  "/betting/$roomId/vote/detailResult": typeof BettingRoomIdVoteDetailResultRoute;
  "/betting/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/create-vote": typeof CreateVoteRoute;
  "/login": typeof LoginRoute;
  "/my-page": typeof MyPageRoute;
  "/require-login": typeof RequireLoginRoute;
  "/require-roomId": typeof RequireRoomIdRoute;
  "/predict-detail/$userType": typeof PredictDetailUserTypeRoute;
  "/betting/": typeof BettingIndexRoute;
  "/betting_/$roomId/vote": typeof BettingRoomIdVoteRouteWithChildren;
  "/betting_/$roomId/waiting": typeof BettingRoomIdWaitingRoute;
  "/betting_/$roomId/vote/decide": typeof BettingRoomIdVoteDecideRoute;
  "/betting_/$roomId/vote/detailResult": typeof BettingRoomIdVoteDetailResultRoute;
  "/betting_/$roomId/vote/voting": typeof BettingRoomIdVoteVotingRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-login"
    | "/require-roomId"
    | "/predict-detail/$userType"
    | "/betting"
    | "/betting/$roomId/vote"
    | "/betting/$roomId/waiting"
    | "/betting/$roomId/vote/decide"
    | "/betting/$roomId/vote/detailResult"
    | "/betting/$roomId/vote/voting";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-login"
    | "/require-roomId"
    | "/predict-detail/$userType"
    | "/betting"
    | "/betting/$roomId/vote"
    | "/betting/$roomId/waiting"
    | "/betting/$roomId/vote/decide"
    | "/betting/$roomId/vote/detailResult"
    | "/betting/$roomId/vote/voting";
  id:
    | "__root__"
    | "/"
    | "/create-vote"
    | "/login"
    | "/my-page"
    | "/require-login"
    | "/require-roomId"
    | "/predict-detail/$userType"
    | "/betting/"
    | "/betting_/$roomId/vote"
    | "/betting_/$roomId/waiting"
    | "/betting_/$roomId/vote/decide"
    | "/betting_/$roomId/vote/detailResult"
    | "/betting_/$roomId/vote/voting";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  CreateVoteRoute: typeof CreateVoteRoute;
  LoginRoute: typeof LoginRoute;
  MyPageRoute: typeof MyPageRoute;
  RequireLoginRoute: typeof RequireLoginRoute;
  RequireRoomIdRoute: typeof RequireRoomIdRoute;
  PredictDetailUserTypeRoute: typeof PredictDetailUserTypeRoute;
  BettingIndexRoute: typeof BettingIndexRoute;
  BettingRoomIdVoteRoute: typeof BettingRoomIdVoteRouteWithChildren;
  BettingRoomIdWaitingRoute: typeof BettingRoomIdWaitingRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CreateVoteRoute: CreateVoteRoute,
  LoginRoute: LoginRoute,
  MyPageRoute: MyPageRoute,
  RequireLoginRoute: RequireLoginRoute,
  RequireRoomIdRoute: RequireRoomIdRoute,
  PredictDetailUserTypeRoute: PredictDetailUserTypeRoute,
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
        "/require-login",
        "/require-roomId",
        "/predict-detail/$userType",
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
    "/require-login": {
      "filePath": "require-login.tsx"
    },
    "/require-roomId": {
      "filePath": "require-roomId.tsx"
    },
    "/predict-detail/$userType": {
      "filePath": "predict-detail.$userType.tsx"
    },
    "/betting/": {
      "filePath": "betting.index.tsx"
    },
    "/betting_/$roomId/vote": {
      "filePath": "betting_.$roomId.vote.tsx",
      "children": [
        "/betting_/$roomId/vote/decide",
        "/betting_/$roomId/vote/detailResult",
        "/betting_/$roomId/vote/voting"
      ]
    },
    "/betting_/$roomId/waiting": {
      "filePath": "betting_.$roomId.waiting.tsx"
    },
    "/betting_/$roomId/vote/decide": {
      "filePath": "betting_.$roomId.vote.decide.tsx",
      "parent": "/betting_/$roomId/vote"
    },
    "/betting_/$roomId/vote/detailResult": {
      "filePath": "betting_.$roomId.vote.detailResult.tsx",
      "parent": "/betting_/$roomId/vote"
    },
    "/betting_/$roomId/vote/voting": {
      "filePath": "betting_.$roomId.vote.voting.tsx",
      "parent": "/betting_/$roomId/vote"
    }
  }
}
ROUTE_MANIFEST_END */

/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatisticsController } from './../controllers/StatisticsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResourceController } from './../controllers/ResourceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductController } from './../controllers/ProductController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderController } from './../controllers/OrderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FileController } from './../controllers/FileController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EvaluateController } from './../controllers/EvaluateController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CateController } from './../controllers/CateController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BrandController } from './../controllers/BrandController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AddressController } from './../controllers/AddressController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AccountController } from './../controllers/AccountController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MallUserController } from './../controllers/mall/MallUserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MallResourceController } from './../controllers/mall/MallResourceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MallProductController } from './../controllers/mall/MallProductController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MallOrderController } from './../controllers/mall/MallOrderController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MallDecorateController } from './../controllers/mall/MallDecorateController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "mongoose.Types.ObjectId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountState": {
        "dataType": "refEnum",
        "enums": ["in-used","forbidden"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "id": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["user"]},{"dataType":"enum","enums":["admin"]}],"required":true},
            "refreshToken": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "accessToken": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "nickName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "avatar": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "address": {"dataType":"union","subSchemas":[{"ref":"mongoose.Types.ObjectId"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "loginTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "logoutTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "account": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "state": {"ref":"AccountState"},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_UserDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"UserDTO"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.password-or-email_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginParams": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserDTO.password-or-email_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_String-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity__accessToken-string--refreshToken-string__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true},"accessToken":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatisticsType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["visits"]},{"dataType":"enum","enums":["sales"]},{"dataType":"enum","enums":["orders"]},{"dataType":"enum","enums":["deals"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatisticsItemType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"todayValue":{"dataType":"double","required":true},"statisticalDimensions":{"dataType":"string","required":true},"weekLifeingType":{"dataType":"double","required":true},"weekPercentage":{"dataType":"string","required":true},"dayLifeingType":{"dataType":"double","required":true},"dayPercentage":{"dataType":"string","required":true},"total":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatisticsDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "key": {"ref":"StatisticsType","required":true},
            "values": {"ref":"StatisticsItemType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseListEntity_StatisticsDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"StatisticsDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountryDTO": {
        "dataType": "refObject",
        "properties": {
            "en": {"dataType":"string","required":true},
            "cn": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_Array_CountryDTO__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CountryDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageItemType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"languageMap":{"ref":"Record_string.any_","required":true},"language":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CateDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "languageList": {"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageItemType"},"required":true},
            "id": {"dataType":"string"},
            "title": {"dataType":"string","required":true},
            "parentId": {"ref":"mongoose.Types.ObjectId"},
            "level": {"dataType":"double"},
            "paramsList": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"values":{"dataType":"array","array":{"dataType":"string"},"required":true},"key":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductState": {
        "dataType": "refEnum",
        "enums": ["on-line","off-line"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "languageList": {"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageItemType"},"required":true},
            "cates": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refAlias","ref":"mongoose.Types.ObjectId"}},{"dataType":"array","array":{"dataType":"refObject","ref":"CateDTO"}}],"required":true},
            "productName": {"dataType":"string","required":true},
            "masterPicture": {"dataType":"string","required":true},
            "descPic": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "slug": {"dataType":"string","required":true},
            "state": {"ref":"ProductState","required":true},
            "richText": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "brand": {"dataType":"union","subSchemas":[{"ref":"mongoose.Types.ObjectId"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "activityPrice": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "sales": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "score": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageListType_ProductDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pages":{"dataType":"double","required":true},"pageIndex":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"list":{"dataType":"array","array":{"dataType":"refObject","ref":"ProductDTO"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageListEntity_ProductDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"PageListType_ProductDTO_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageDTO": {
        "dataType": "refObject",
        "properties": {
            "pageIndex": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "keyword": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_ProductDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"ProductDTO"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_string_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_unknown_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Boolean": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_Boolean_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"Boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProductDTO.slug_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"slug":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckSlugParams": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ProductDTO.slug_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ProductDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"cates":{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refAlias","ref":"mongoose.Types.ObjectId"}},{"dataType":"array","array":{"dataType":"refObject","ref":"CateDTO"}}]},"productName":{"dataType":"string"},"masterPicture":{"dataType":"string"},"descPic":{"dataType":"array","array":{"dataType":"string"}},"slug":{"dataType":"string"},"state":{"ref":"ProductState"},"richText":{"dataType":"string"},"brand":{"ref":"mongoose.Types.ObjectId"},"price":{"dataType":"double"},"activityPrice":{"dataType":"double"},"sales":{"dataType":"double"},"score":{"dataType":"double"},"languageList":{"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageItemType"}},"createTime":{"dataType":"datetime"},"modifyTime":{"dataType":"datetime"},"deleteTime":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditProductParams": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Partial_ProductDTO_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"brandId":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_ProductDTO-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"union","subSchemas":[{"ref":"ProductDTO"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_any_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EvaluateDto": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "userId": {"ref":"mongoose.Types.ObjectId","required":true},
            "userNick": {"dataType":"string","required":true},
            "productId": {"ref":"mongoose.Types.ObjectId","required":true},
            "score": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "evaluateTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "userAvatar": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
            "pictures": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageListType_EvaluateDto_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pages":{"dataType":"double","required":true},"pageIndex":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"list":{"dataType":"array","array":{"dataType":"refObject","ref":"EvaluateDto"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageListEntity_EvaluateDto_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"PageListType_EvaluateDto_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_Array_CateDTO__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CateDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_CateDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"CateDTO"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CateDTO.title-or-level-or-parentId-or-paramsList_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"level":{"dataType":"double"},"parentId":{"ref":"mongoose.Types.ObjectId"},"paramsList":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"values":{"dataType":"array","array":{"dataType":"string"},"required":true},"key":{"dataType":"string","required":true}}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_CateDTO.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditCateDTO": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_CateDTO.title-or-level-or-parentId-or-paramsList_"},{"ref":"Partial_Pick_CateDTO.id__"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_CateDTO-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"union","subSchemas":[{"ref":"CateDTO"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_BrandDTO.id-or-name-or-icon_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"icon":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SingleBrandDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_BrandDTO.id-or-name-or-icon_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_Array_SingleBrandDTO__": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"SingleBrandDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BrandDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "languageList": {"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageItemType"},"required":true},
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageListType_BrandDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pages":{"dataType":"double","required":true},"pageIndex":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"list":{"dataType":"array","array":{"dataType":"refObject","ref":"BrandDTO"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageListEntity_BrandDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"PageListType_BrandDTO_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_BrandDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"BrandDTO"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_BrandDTO.name-or-icon_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"icon":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_BrandDTO.languageList__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"languageList":{"dataType":"array","array":{"dataType":"refAlias","ref":"LanguageItemType"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditBrandDTO": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_BrandDTO.name-or-icon_"},{"ref":"Partial_Pick_BrandDTO.languageList__"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_BrandDTO-or-null_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"union","subSchemas":[{"ref":"BrandDTO"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddressDTO": {
        "dataType": "refObject",
        "properties": {
            "createTime": {"dataType":"datetime"},
            "modifyTime": {"dataType":"datetime"},
            "deleteTime": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "isDefault": {"dataType":"boolean","required":true},
            "provinceCode": {"dataType":"string","required":true},
            "provinceName": {"dataType":"string","required":true},
            "cityCode": {"dataType":"string","required":true},
            "cityName": {"dataType":"string","required":true},
            "areaName": {"dataType":"string","required":true},
            "areaCode": {"dataType":"string","required":true},
            "detailAddress": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageListType_AddressDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pages":{"dataType":"double","required":true},"pageIndex":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"list":{"dataType":"array","array":{"dataType":"refObject","ref":"AddressDTO"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageListEntity_AddressDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"PageListType_AddressDTO_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PageListType_UserDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pages":{"dataType":"double","required":true},"pageIndex":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"total":{"dataType":"double","required":true},"list":{"dataType":"array","array":{"dataType":"refObject","ref":"UserDTO"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageListEntity_UserDTO_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"PageListType_UserDTO_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.Exclude_keyofUserDTO.password-or-refreshToken-or-accessToken-or-logoutTime-or-isPasswordMatched__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"state":{"ref":"AccountState"},"createTime":{"dataType":"datetime"},"modifyTime":{"dataType":"datetime"},"deleteTime":{"dataType":"datetime"},"id":{"dataType":"string","required":true},"role":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["user"]},{"dataType":"enum","enums":["admin"]}],"required":true},"nickName":{"dataType":"string"},"avatar":{"dataType":"string"},"address":{"ref":"mongoose.Types.ObjectId"},"loginTime":{"dataType":"datetime"},"account":{"dataType":"string"},"firstName":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_UserDTO.password-or-refreshToken-or-accessToken-or-logoutTime-or-isPasswordMatched_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserDTO.Exclude_keyofUserDTO.password-or-refreshToken-or-accessToken-or-logoutTime-or-isPasswordMatched__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserWithoutToken": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_UserDTO.password-or-refreshToken-or-accessToken-or-logoutTime-or-isPasswordMatched_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_UserWithoutToken_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"ref":"UserWithoutToken"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.state_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"state":{"ref":"AccountState"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserToggleEnabledParams": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserDTO.state_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRegisterParams": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_UserDTO.password_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"token":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.email-or-password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserQuickRegisterParams": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Pick_UserDTO.email-or-password_"},{"dataType":"nestedObjectLiteral","nestedProperties":{"code":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserDTO.account-or-avatar-or-nickName_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"nickName":{"dataType":"string"},"avatar":{"dataType":"string"},"account":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditUserParams": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserDTO.account-or-avatar-or-nickName_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity_String_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ModifyPwdParams": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"newPassword":{"dataType":"string","required":true},"oldPassword":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity__id-any--title-any--description-any--detail-any--link-string--bgImage-string--cover-string_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"cover":{"dataType":"string","required":true},"bgImage":{"dataType":"string","required":true},"link":{"dataType":"string","required":true},"detail":{"dataType":"any","required":true},"description":{"dataType":"any","required":true},"title":{"dataType":"any","required":true},"id":{"dataType":"any","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BaseObjectEntity__id-any--name-any--icon-string_-Array_": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"double","default":0},
            "message": {"dataType":"string","default":"操作成功"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"icon":{"dataType":"string","required":true},"name":{"dataType":"any","required":true},"id":{"dataType":"any","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        app.post('/user/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.checkUser)),

            async function UserController_checkUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserLoginParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'checkUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/info',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserInfo)),

            async function UserController_getUserInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/logout',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.logout)),

            async function UserController_logout(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/user/refreshToken',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.refreshToken)),

            async function UserController_refreshToken(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/statistics/all',
            ...(fetchMiddlewares<RequestHandler>(StatisticsController)),
            ...(fetchMiddlewares<RequestHandler>(StatisticsController.prototype.getTotalStatistics)),

            async function StatisticsController_getTotalStatistics(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StatisticsController();

              await templateService.apiHandler({
                methodName: 'getTotalStatistics',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/resource/countries',
            ...(fetchMiddlewares<RequestHandler>(ResourceController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceController.prototype.getCountries)),

            async function ResourceController_getCountries(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ResourceController();

              await templateService.apiHandler({
                methodName: 'getCountries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/product/list',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.getProductList)),

            async function ProductController_getProductList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'getProductList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/product/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.getAProduct)),

            async function ProductController_getAProduct(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'getAProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/product/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.removeAProduct)),

            async function ProductController_removeAProduct(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'removeAProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/product/:id/upOrDownShelves',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.upOrDownAProduct)),

            async function ProductController_upOrDownAProduct(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"state":{"ref":"ProductState","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'upOrDownAProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/product/slug/check',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.checkSlugUnique)),

            async function ProductController_checkSlugUnique(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"ref":"CheckSlugParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'checkSlugUnique',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/product/publish',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.createProduct)),

            async function ProductController_createProduct(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"ref":"EditProductParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'createProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/product/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.editProduct)),

            async function ProductController_editProduct(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'editProduct',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/product/:id/quickEditPrice',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.quickEditPrice)),

            async function ProductController_quickEditPrice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'quickEditPrice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/file/uploadFile',
            ...(fetchMiddlewares<RequestHandler>(FileController)),
            ...(fetchMiddlewares<RequestHandler>(FileController.prototype.wrapFile)),

            async function FileController_wrapFile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    type: {"in":"query","name":"type","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FileController();

              await templateService.apiHandler({
                methodName: 'wrapFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/file/uploadFiles',
            ...(fetchMiddlewares<RequestHandler>(FileController)),
            ...(fetchMiddlewares<RequestHandler>(FileController.prototype.wrapFiles)),

            async function FileController_wrapFiles(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FileController();

              await templateService.apiHandler({
                methodName: 'wrapFiles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/evaluate/list',
            ...(fetchMiddlewares<RequestHandler>(EvaluateController)),
            ...(fetchMiddlewares<RequestHandler>(EvaluateController.prototype.getEvaluateByProductId)),

            async function EvaluateController_getEvaluateByProductId(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"queries","name":"params","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EvaluateController();

              await templateService.apiHandler({
                methodName: 'getEvaluateByProductId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/cate/list',
            ...(fetchMiddlewares<RequestHandler>(CateController)),
            ...(fetchMiddlewares<RequestHandler>(CateController.prototype.getCateList)),

            async function CateController_getCateList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CateController();

              await templateService.apiHandler({
                methodName: 'getCateList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/cate',
            ...(fetchMiddlewares<RequestHandler>(CateController)),
            ...(fetchMiddlewares<RequestHandler>(CateController.prototype.addACate)),

            async function CateController_addACate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"ref":"EditCateDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CateController();

              await templateService.apiHandler({
                methodName: 'addACate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/cate/:id',
            ...(fetchMiddlewares<RequestHandler>(CateController)),
            ...(fetchMiddlewares<RequestHandler>(CateController.prototype.editACate)),

            async function CateController_editACate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"ref":"CateDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CateController();

              await templateService.apiHandler({
                methodName: 'editACate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/cate/:id',
            ...(fetchMiddlewares<RequestHandler>(CateController)),
            ...(fetchMiddlewares<RequestHandler>(CateController.prototype.removeACate)),

            async function CateController_removeACate(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CateController();

              await templateService.apiHandler({
                methodName: 'removeACate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/brand/allBrand',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.getAllBandList)),

            async function BrandController_getAllBandList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'getAllBandList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/brand/list',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.getBrandList)),

            async function BrandController_getBrandList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'getBrandList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/brand',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.addABrand)),

            async function BrandController_addABrand(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"ref":"EditBrandDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'addABrand',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/brand/:id',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.getABrand)),

            async function BrandController_getABrand(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'getABrand',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/brand/:id',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.editABrand)),

            async function BrandController_editABrand(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"ref":"EditBrandDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'editABrand',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/brand/:id',
            ...(fetchMiddlewares<RequestHandler>(BrandController)),
            ...(fetchMiddlewares<RequestHandler>(BrandController.prototype.removeABrand)),

            async function BrandController_removeABrand(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BrandController();

              await templateService.apiHandler({
                methodName: 'removeABrand',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/address/list',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.getAddressList)),

            async function AddressController_getAddressList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"queries","name":"params","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'getAddressList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/address',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.createAddress)),

            async function AddressController_createAddress(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'createAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/address/:id',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.modifyAddress)),

            async function AddressController_modifyAddress(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"ref":"AddressDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'modifyAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/address/:id',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.DeleteAddress)),

            async function AddressController_DeleteAddress(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'DeleteAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/address/:id/default',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.setDefaultAddress)),

            async function AddressController_setDefaultAddress(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'setDefaultAddress',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/address/:id',
            ...(fetchMiddlewares<RequestHandler>(AddressController)),
            ...(fetchMiddlewares<RequestHandler>(AddressController.prototype.getAddressInfo)),

            async function AddressController_getAddressInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AddressController();

              await templateService.apiHandler({
                methodName: 'getAddressInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/account/list',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.getUserList)),

            async function AccountController_getUserList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'getUserList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/account/info/:id',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.getAUser)),

            async function AccountController_getAUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'getAUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/account/:id/toggleAccountState',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.toggleAccountState)),

            async function AccountController_toggleAccountState(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"ref":"UserToggleEnabledParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'toggleAccountState',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/login',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.login)),

            async function MallUserController_login(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserLoginParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/getRegisterLink',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.getRegisterLink)),

            async function MallUserController_getRegisterLink(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'getRegisterLink',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/register',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.registerNewAccount)),

            async function MallUserController_registerNewAccount(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserRegisterParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'registerNewAccount',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/resetPwd',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.resetPwd)),

            async function MallUserController_resetPwd(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"token":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'resetPwd',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/getResetPwdLink',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.getResetPwdLink)),

            async function MallUserController_getResetPwdLink(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'getResetPwdLink',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/quickRegisterCode',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.getQuickRegisterCode)),

            async function MallUserController_getQuickRegisterCode(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'getQuickRegisterCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/registerWithCode',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.registerWithCode)),

            async function MallUserController_registerWithCode(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    params: {"in":"body","name":"params","required":true,"ref":"UserQuickRegisterParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'registerWithCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/info/modify',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.modifyAUser)),

            async function MallUserController_modifyAUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"EditUserParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'modifyAUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/modifyPwd',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.modifyPwd)),

            async function MallUserController_modifyPwd(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ModifyPwdParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'modifyPwd',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/user/delete',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.deleteAccount)),

            async function MallUserController_deleteAccount(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'deleteAccount',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/user/refreshToken',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.refreshToken)),

            async function MallUserController_refreshToken(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/info',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.getUserInfo)),

            async function MallUserController_getUserInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'getUserInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/logout',
            ...(fetchMiddlewares<RequestHandler>(MallUserController)),
            ...(fetchMiddlewares<RequestHandler>(MallUserController.prototype.logout)),

            async function MallUserController_logout(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallUserController();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/product/allBrand',
            ...(fetchMiddlewares<RequestHandler>(MallProductController)),
            ...(fetchMiddlewares<RequestHandler>(MallProductController.prototype.getAllBandList)),

            async function MallProductController_getAllBandList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallProductController();

              await templateService.apiHandler({
                methodName: 'getAllBandList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/product/allCate',
            ...(fetchMiddlewares<RequestHandler>(MallProductController)),
            ...(fetchMiddlewares<RequestHandler>(MallProductController.prototype.getCateList)),

            async function MallProductController_getCateList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallProductController();

              await templateService.apiHandler({
                methodName: 'getCateList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/product/list',
            ...(fetchMiddlewares<RequestHandler>(MallProductController)),
            ...(fetchMiddlewares<RequestHandler>(MallProductController.prototype.getProductList)),

            async function MallProductController_getProductList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    query: {"in":"queries","name":"query","required":true,"ref":"PageDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallProductController();

              await templateService.apiHandler({
                methodName: 'getProductList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/product/:id',
            ...(fetchMiddlewares<RequestHandler>(MallProductController)),
            ...(fetchMiddlewares<RequestHandler>(MallProductController.prototype.getProductDetail)),

            async function MallProductController_getProductDetail(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallProductController();

              await templateService.apiHandler({
                methodName: 'getProductDetail',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/product/slug/:slug',
            ...(fetchMiddlewares<RequestHandler>(MallProductController)),
            ...(fetchMiddlewares<RequestHandler>(MallProductController.prototype.getProductDetailBySlug)),

            async function MallProductController_getProductDetailBySlug(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallProductController();

              await templateService.apiHandler({
                methodName: 'getProductDetailBySlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/decorate/carousel/list',
            ...(fetchMiddlewares<RequestHandler>(MallDecorateController)),
            ...(fetchMiddlewares<RequestHandler>(MallDecorateController.prototype.getCarouselList)),

            async function MallDecorateController_getCarouselList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallDecorateController();

              await templateService.apiHandler({
                methodName: 'getCarouselList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/decorate/brand/list',
            ...(fetchMiddlewares<RequestHandler>(MallDecorateController)),
            ...(fetchMiddlewares<RequestHandler>(MallDecorateController.prototype.getRecommendBrandList)),

            async function MallDecorateController_getRecommendBrandList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new MallDecorateController();

              await templateService.apiHandler({
                methodName: 'getRecommendBrandList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

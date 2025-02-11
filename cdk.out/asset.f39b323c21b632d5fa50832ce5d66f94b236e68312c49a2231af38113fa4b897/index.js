var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/spaces/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);
var import_client_dynamodb2 = require("@aws-sdk/client-dynamodb");

// src/services/spaces/PostSpaces.ts
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");

// node_modules/uuid/dist/esm/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm/rng.js
var import_crypto = require("crypto");
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    (0, import_crypto.randomFillSync)(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm/native.js
var import_crypto2 = require("crypto");
var native_default = { randomUUID: import_crypto2.randomUUID };

// node_modules/uuid/dist/esm/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/services/spaces/PostSpaces.ts
async function postSpaces(event, ddbClient2) {
  console.log("Received Event:", JSON.stringify(event, null, 2));
  try {
    if (!event.body) {
      console.log("Error: Missing event.body!");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is missing" })
      };
    }
    const body = JSON.parse(event.body);
    console.log("Parsed Body:", body);
    if (!body.location) {
      console.log("Error: Missing 'location' field!");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required field: location" })
      };
    }
    const randomId = v4_default();
    const item = {
      id: { S: randomId },
      location: { S: body.location }
    };
    console.log("Writing to DynamoDB:", item);
    const result = await ddbClient2.send(new import_client_dynamodb.PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: item
    }));
    console.log("DynamoDB PutItem Result:", result);
    return {
      statusCode: 201,
      body: JSON.stringify({ id: randomId })
    };
  } catch (error) {
    console.error("Error in Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message })
    };
  }
}

// src/services/spaces/handler.ts
var ddbClient = new import_client_dynamodb2.DynamoDBClient({});
async function handler(event, context) {
  let message;
  try {
    switch (event.httpMethod) {
      case "GET":
        message = "Hello from GET!";
        break;
      case "POST":
        const response2 = postSpaces(event, ddbClient);
        return response2;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
    const response2 = {
      statusCode: 200,
      body: JSON.stringify(message)
    };
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(message)
  };
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

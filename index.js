/**
nexmo context: 
you can find this as the second parameter of rtcEvent funciton or as part or the request in req.nexmo in every request received by the handler 
you specify in the route function.

it contains the following: 
const {
        generateBEToken,
        generateUserToken,
        logger,
        csClient,
        storageClient
} = nexmo;

- generateBEToken, generateUserToken,// those methods can generate a valid token for application
- csClient: this is just a wrapper on https://github.com/axios/axios who is already authenticated as a nexmo application and 
    is gonna already log any request/response you do on conversation api. 
    Here is the api spec: https://jurgob.github.io/conversation-service-docs/#/openapiuiv3
- logger: this is an integrated logger, basically a bunyan instance
- storageClient: this is a simple key/value inmemory-storage client based on redis

*/

/**
 *
 * This function is meant to handle all the asyncronus event you are gonna receive from conversation api
 *
 * it has 2 parameters, event and nexmo context
 * @param {object} event - this is a conversation api event. Find the list of the event here: https://jurgob.github.io/conversation-service-docs/#/customv3
 * @param {object} nexmo - see the context section above
 * */

const DATACENTER = `https://api.nexmo.com`;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const voiceEvent = async (req, res, next) => {
  const { logger, csClient, storageClient } = req.nexmo;

  try {
    logger.info("voiceEvent", req.body, req.query);
    res.json({});
  } catch (err) {
    logger.error("Error on voiceEvent function");
  }
};

const voiceAnswer = async (req, res, next) => {
  const { logger, csClient } = req.nexmo;
  logger.info("req", { req_body: req.body });
  try {
    return res.json([
      {
        action: "connect",
        from: "447451276946", //your_lvn
        endpoint: [
          {
            type: "phone",
            number: "447599488246",
            onAnswer: {
              url: "http://23.22.82.10:8086/webhooks/agentWhisper/ad_1",
            },
          },
        ],
      },
    ]);
  } catch (err) {
    logger.error("Error on voiceAnswer function");
  }
};

const rtcEvent = async (event, { logger, csClient, storageClient }) => {
  try {
  } catch (err) {
    logger.error({ err }, "Error on rtcEvent function");
  }
};

/**
 *
 * @param {object} app - this is an express app
 * you can register and handler same way you would do in express.
 * the only difference is that in every req, you will have a req.nexmo variable containning a nexmo context
 *
 */
const route = (app) => {
  app.get("/hello", async (req, res) => {
    const { logger } = req.nexmo;

    logger.info(`Hello Request HTTP `);

    res.json({
      text: "Hello Request!",
    });
  });
};

module.exports = {
  voiceAnswer,
  voiceEvent,
  rtcEvent,
  route,
};

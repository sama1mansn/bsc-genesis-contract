const program = require("commander");
const fs = require("fs");
const nunjucks = require("nunjucks");
const formatChainID = require("./utils");


program.version("0.0.1");
program.option(
    "-t, --template <template>",
    "CrossChain template file",
    "./contracts/CrossChain.template"
);

program.option(
    "-o, --output <output-file>",
    "TokenHub.sol",
    "./contracts/CrossChain.sol"
)

program.option("--initBatchSizeForOracle <initBatchSizeForOracle>",
    "init batch size for oracle",
    "50");

program.option("--mock <mock>",
    "if use mock",
    false);

program.parse(process.argv);

const bscChainId = formatChainID(program.chainid);

const data = {
  bscChainId: bscChainId,
  initBatchSizeForOracle: program.initBatchSizeForOracle,
  mock: program.mock,
};
const templateString = fs.readFileSync(program.template).toString();
const resultString = nunjucks.renderString(templateString, data);
fs.writeFileSync(program.output, resultString);
console.log("CrossChain file updated.");

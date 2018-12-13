const { createMacro } = require("babel-plugin-macros");

function envMacro({ references, state, babel }) {
  references.default.map(referencePath => {
    if (referencePath.parentPath.type === "CallExpression") {
      inlineEnvVariable({ referencePath, state, babel });
    } else {
      throw new Error(
        `This is not supported: \`${referencePath
          .findParent(babel.types.isExpression)
          .getSource()}\`. Please see the env.macro documentation`,
      );
    }
  });
}

function inlineEnvVariable({ referencePath, state, babel }) {
  const t = babel.types;
  const callExpressionPath = referencePath.parentPath;
  let envVariableName;

  try {
    envVariableName = callExpressionPath.get("arguments")[0].evaluate().value;
  } catch (err) {
    // swallow error, print better error below
    throw new Error(
      `There was a problem evaluating the value of the argument for the code: ${callExpressionPath.getSource()}. ` +
        `If the value is dynamic, please make sure that its value is statically deterministic.`,
    );
  }

  const envVariableValue = process.env[envVariableName];

  callExpressionPath.parentPath.replaceWith(t.stringLiteral(envVariableValue));
}

export default createMacro(envMacro);

export async function main(ns) {
  const folder = "contracts";
  const listFile = `${folder}/contract-locations.txt`;

  if (!ns.fileExists(listFile, "home")) {
    ns.tprint(`Missing ${listFile}. Run downloadContracts.js first.`);
    return;
  }

  const lines = ns.read(listFile).split(/\n/).map(l => l.trim()).filter(l => l);

  const launched = [];

  for (const entry of lines) {
    const [server, file] = entry.split("/");
    if (!server || !file) continue;
    const type = ns.codingcontract.getContractType(file, server);
    const scriptName = `${folder}/${typeToFile(type)}`;
    if (ns.fileExists(scriptName, "home")) {
      let data = ns.codingcontract.getData(file, server);
      // Serialize data to ensure it is a valid script argument, including BigInt support
      const dataArg = JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      ns.exec(scriptName, "home", 1, dataArg, file, server);
      launched.push({ server, type });
    }
  }

  for (const info of launched) {
    ns.tprint(`Launched ${info.type} on ${info.server}`);
  }
}

function typeToFile(type) {
  // Remove accents by normalizing and removing diacritics
  const normalized = type.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return (
    normalized
      .replace(/ /g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "") +
    ".js"
  );
}

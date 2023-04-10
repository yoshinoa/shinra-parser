import config from "@/config.json";

export default async function parse_data(to_parse) {
  console.log(to_parse);
  if (to_parse == null) {
    return;
  }
  const { unique_skill_ids, playerClass } = pre_process(to_parse);
  let skill_map = {};

  let response = await fetch(config.tsv_url);
  let responsetext = await response.text();
  responsetext.split(/\r?\n/).forEach(function (line) {
    let fields = line.split("\t");
    if (fields[3] == playerClass && unique_skill_ids.has(parseInt(fields[0]))) {
      let skill_id = parseInt(fields[0]);
      let skill_name = fields[4];
      let skill_icon = fields[7];
      skill_map[skill_id] = {
        name: skill_name,
        icon: config.icon_base + skill_icon + config.icon_suffix,
      };
    }
  });
  return skill_map;
}
// read the tab-separated values file into a dictionary with skillId as the key and skill name as the value

// let rawdata = fs.readFileSync("log.json");
// let json_data = JSON.parse(rawdata);
function pre_process(json_file) {
  const skillLog = json_file.players[0].dealtSkillLog;
  const playerClass = json_file.players[0].playerClass;
  // want to find all unique skillids in the skilllog
  let unique_skill_ids = new Set();
  for (let skill of skillLog) {
    unique_skill_ids.add(skill.skillId);
  }
  return { unique_skill_ids: unique_skill_ids, playerClass: playerClass };
}

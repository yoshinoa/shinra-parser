import styles from "@/styles/SkillOutput.module.css";

export default function IconRender(props) {
  const logData = props.logData.players[0].dealtSkillLog;
  const parsedSkills = props.parsedSkills;
  const time = props.time * 1000;
  let prevSkillId = null; // to keep track of the previous skill ID
  let count = 1;
  let prevIcon = null;
  console.log(time);

  return (
    <div className={styles["icon-container"]}>
      {logData.map((cast, key) => {
        const skillId = cast.skillId;
        if (cast.amount > 0 && (time == 0 || time >= cast.time)) {
          try {
            const icon = parsedSkills[skillId].icon;
            if (prevSkillId === skillId) {
              count++;
            } else {
              if (prevSkillId !== null) {
                const iconToRender = (
                  <div key={key} className={styles["skill-icon-container"]}>
                    <img src={prevIcon} alt={`Skill ${skillId}`} />
                    {count > 1 ? (
                      <div className={styles["skill-icon-count"]}>{count}</div>
                    ) : null}
                  </div>
                );
                count = 1;
                prevIcon = icon;
                prevSkillId = skillId;
                return iconToRender;
              } else {
                prevIcon = icon;
              }
            }
            prevSkillId = skillId;
          } catch (error) {
            console.log(error);
          }
        }
      })}
    </div>
  );
}

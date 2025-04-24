import { backendSkills, frontendSkills, toolsSkill } from "@/stores/skillStore";
import RevealAnimation from "../elements/skill/RevealAnimation";
import CardType1 from "../elements/skill/cards/CardType1";
import CardType2 from "../elements/skill/cards/CardType2";

const Skills = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-20">
      <div className="w-full flex justify-center mb-96">
        <RevealAnimation>
          <div className="flex justify-center items-center">
            <CardType1 items={toolsSkill} />
          </div>
          <div className="flex justify-center items-center">
            <CardType1 items={backendSkills} />
          </div>
          <div className="flex justify-center items-center">
            <CardType1 items={frontendSkills} />
          </div>
          <div className="flex justify-center items-center">
            <CardType2 />
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
};

export default Skills;

import './index.css'

const SkillsCard = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill

  return (
    <li className="skills-list-item-container">
      <img className="skill-item-img" src={imageUrl} alt={name} />
      <p className="skill-item-name">{name}</p>
    </li>
  )
}

export default SkillsCard

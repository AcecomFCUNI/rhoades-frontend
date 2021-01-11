import { studentEstates, teacherEstates } from "constants/index"

export const codeRules = {
  uni: {
    length: 9,
    regex: /^[0-9]{8}[A-Z]$/
  },
  dni: {
    length: 8,
    regex: /^[0-9]{8}$/
  }
}

export const isAValidCodeByRule = (code, rule) => codeRules[rule].regex.test(code)

export const formatCodeToRule = (code, rule, uppercase = false) => {
  const length = codeRules[rule].length
  
  if(uppercase) code = code.toUpperCase()
  if(code.length > length) return code.slice(0, length)
  return code
}

export const splitNamesAndGetOne = (names) => names.split(' ')[0];

export const getLabelFromEstate = (estateType, condition) => {
  let estateLabel = ''

  if(condition === 'teachers')
    estateLabel = teacherEstates.find(estate => estate.value === estateType).label
  else if(condition === 'students')
    estateLabel = studentEstates.find(estate => estate.value === estateType).label
  
  return estateLabel
}
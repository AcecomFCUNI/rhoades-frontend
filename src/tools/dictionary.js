export const translateWord = (string) => {
  switch(string) {
    case 'teachers': return 'docentes'
    case 'students': return 'estudiantes'
    default: return 'not found' 
  }
}
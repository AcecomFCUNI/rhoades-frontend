export default [
  {
    title: 'Inscripciones',
    pages: [
      {
        title: 'Docente',
        href: '/procurator/enroll/teacher',
        children: [
          {
            title: 'Decano',
            href: '/procurator/enroll/teacher/dean',
          },
          {
            title: 'Rector',
            href: '/procurator/enroll/teacher/rector',
          },
          {
            title: 'Consejo de facultad',
            href: '/procurator/enroll/teacher/faculty-council',
          },
          {
            title: 'Asamblea universitaria',
            href: '/procurator/enroll/teacher/university-assembly',
          },
          {
            title: 'Consejo universitario',
            href: '/procurator/enroll/teacher/university-council',
          }
        ],
      },
      {
        title: 'Estudiante',
        href: '/procurator/enroll/student',
        children: [
          {
            title: 'Tercio de facultad',
            href: '/procurator/enroll/student/third-of-faculty',
          },
          {
            title: 'Asamblea universitaria',
            href: '/procurator/enroll/student/university-third-assembly',
          },
          {
            title: 'Consejo universitario',
            href: '/procurator/enroll/student/university-third-council',
          }
        ],
      },
      {
        title: 'Subir documentos',
        href: '/procurator/upload-files',
      },
    ],
  },
];

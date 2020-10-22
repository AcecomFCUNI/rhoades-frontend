import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

export default [
  {
    title: 'Dashboard',
    pages: [
      {
        title: 'Inscribir lista',
        href: '/student/enroll-list',
        icon: WorkRoundedIcon,
        children: [
          {
            title: 'Tercio Facultad',
            href: '/student/enroll-list/faculty-third',
            icon: PageviewRoundedIcon,
          },
          {
            title: 'Tercio Universidad',
            href: '/student/enroll-list/university-third',
            icon: SendRoundedIcon,
            children: [
              {
                title: 'Consejo Universitario',
                href: '/student/enroll-list/university-third/council',
                icon: PageviewRoundedIcon,
              },
              {
                title: 'Asamblea Universitaria',
                href: '/student/enroll-list/university-third/assembly',
                icon: PageviewRoundedIcon,
              },
            ],
          },
        ],
      },
      {
        title: 'Subir documentos',
        href: '/student/upload-files',
        icon: WorkRoundedIcon,
      },
    ],
  },
];

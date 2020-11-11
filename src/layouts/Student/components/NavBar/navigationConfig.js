import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

export default [
  {
    title: 'Opciones',
    pages: [
      {
        title: 'Inscribir lista',
        href: '/student/enroll-list',
        icon: WorkRoundedIcon,
        children: [
          {
            title: 'Tercio de facultad',
            href: '/student/enroll-list/faculty-third',
            icon: PageviewRoundedIcon,
          },
          {
            title: 'Tercio universitario',
            href: '/student/enroll-list/university-third',
            icon: SendRoundedIcon,
            children: [
              {
                title: 'Consejo universitario',
                href: '/student/enroll-list/university-third/council',
                icon: PageviewRoundedIcon,
              },
              {
                title: 'Asamblea universitaria',
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

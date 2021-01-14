import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

const config = [
  {
    title: 'Opciones',
    pages: [
      {
        title: 'Inscribir lista o candidato',
        href: '/teacher/enroll-list-or-candidate',
        icon: WorkRoundedIcon,
        children: [
          {
            title: 'Decanato',
            href: '/teacher/enroll-list-or-candidate/decan',
            icon: PageviewRoundedIcon,
          },
          {
            title: 'Rectorado',
            href: '/teacher/enroll-list-or-candidate/rectorate',
            icon: SendRoundedIcon,
          },
        ],
      },
      {
        title: 'Subir documentos',
        href: '/teacher/upload-files',
        icon: WorkRoundedIcon,
      },
    ],
  },
];

export default config
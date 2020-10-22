import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';

export default [
  {
    title: 'Dashboard',
    pages: [
      {
        title: 'Listas',
        href: '/admin/lists',
        icon: WorkRoundedIcon,
        children: [
          {
            title: 'Tercio de facultad',
            href: '/admin/lists/faculty-third',
            icon: PageviewRoundedIcon,
          },
          {
            title: 'Tercio universitario',
            href: '/admin/lists/university-third',
            icon: SendRoundedIcon,
            children: [
              {
                title: 'Asamblea universitaria',
                href: '/admin/lists/university-third/assembly',
                icon: PageviewRoundedIcon,
              },
              {
                title: 'Consejo universitario',
                href: '/admin/lists/university-third/aaaa',
                icon: PageviewRoundedIcon,
              },
            ],
          },
          {
            title: 'Decanato',
            href: '/admin/lists/decan',
            icon: PageviewRoundedIcon,
          },
          {
            title: 'Rectorado',
            href: '/admin/lists/rectorate',
            icon: PageviewRoundedIcon,
          },
        ],
      },
    ],
  },
];

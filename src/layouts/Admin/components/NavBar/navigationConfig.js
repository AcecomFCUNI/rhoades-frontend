import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

const config = [
  {
    title: 'Opciones',
    pages: [
      {
        title: 'Elecciones generales',
        href: '/admin/elections/general',
        icon: PeopleAltRoundedIcon,
      },
      {
        title: 'Elecciones por facultad',
        href: '/admin/elections/faculty',
        icon: SchoolRoundedIcon,
      },
    ],
  },
];

export default config
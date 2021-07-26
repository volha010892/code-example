import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    margin: 10,
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 200,
  },
}));

export default useStyles;
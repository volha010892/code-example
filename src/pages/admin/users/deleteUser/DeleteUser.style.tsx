import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 200,
  },
}));

export default useStyles;
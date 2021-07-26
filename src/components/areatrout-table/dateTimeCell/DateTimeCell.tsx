import React from 'react';
import { Grid } from '@material-ui/core';
import { transformToDateTime } from '../../../utils/utils';

function DateTimeCell(props: {
  date: string;
}) {
  const { date } = props;
  return (
    <Grid>
      {transformToDateTime(date)}
    </Grid>
  );
}

export default DateTimeCell;
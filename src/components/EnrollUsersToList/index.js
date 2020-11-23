import React from 'react'

import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const EnrollUsersToList = ({ estate }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4} lg={3} container justify='center'>
        <Typography variant='h4'>Ingrese el documento del docente que desea inscribir</Typography>     
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={9}>
        <Card elevation={0}>
          <CardContent>
            {estate}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EnrollUsersToList

import { Avatar, Box, Grid } from '@mui/material'
import React from 'react'
import { Rating } from '@mui/material'


const TurfReviewCard = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar 
              className="text-white" 
              sx={{
                width: 56, 
                bgcolor: "#9155fd"
              }}
            >
              R
            </Avatar>
          </Box>
        </Grid>
        
        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Ranga</p>
              <p className="opacity-70">April 5, 2024</p>
            </div>
          </div>
          <Rating value={4.5} readOnly size="small" precision={0.5} />
          <p>Nice Turf, I like the ground and the facilities </p>
        </Grid>
      </Grid>
    </div>
  )
}

export default TurfReviewCard


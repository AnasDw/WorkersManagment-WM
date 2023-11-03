import React from 'react';
import PropTypes from 'prop-types';

// @mui
import { Paper, TableRow, TableBody, TableCell, Typography } from '@mui/material';

const NoResultsMessage = ({ isNotFound, filterName }) =>
  isNotFound ? (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
          <Paper
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>
            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{filterName}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        </TableCell>
      </TableRow>
    </TableBody>
  ) : null;

NoResultsMessage.propTypes = {
  isNotFound: PropTypes.bool.isRequired,
  filterName: PropTypes.string.isRequired,
};

export default NoResultsMessage;

import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

import { getFormattedString } from 'Helper';
import useStyles from './style';
import axios from 'axios';

const Listing = props => {
  const classes = useStyles();
  const history = useHistory();

  const { data, keys, limit } = props;

  if (limit && (data.data || []).length >= limit) {
    data.data = (data.data || []).slice(0, limit);
  }

  if (data.loading) {
    return <div>Loading Data...</div>;
  }

  if (!data.loading && data.error) {
    return <div>Something Went Wrong....</div>;
  }

  const updateHospital = hospitalId => {
    history.push(`/updatehospital/${hospitalId}`);
  };

  const deleteHospital = async element => {
    await axios.delete(`http://localhost:5000/api/1.0/hospital/${element._id}`);
    alert(element.hospitalName + ' ' + 'deleted');
    history.go(0);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(keys || {}).map((element, key) => (
              <TableCell key={key}>{getFormattedString(element)}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data.data || []).map((element, index) => (
            <TableRow>
              {Object.keys(keys || {}).map((d, key) => (
                <TableCell key={key}>
                  {getFormattedString(element[d])}
                </TableCell>
              ))}
              <TableCell>
                <EditIcon
                  onClick={() => updateHospital(element._id)}
                  style={{ marginRight: 15 }}
                />
                <DeleteIcon
                  onClick={() => deleteHospital(element)}
                  color="error"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data.loading && data.data && !data.data.length && (
        <Typography
          style={{ textAlign: 'center' }}
          color="textSecondary"
          variant="body1"
        >
          No Data found
        </Typography>
      )}
    </div>
  );
};

export default Listing;

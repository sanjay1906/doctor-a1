import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@material-ui/core";
import useStyles from "./style";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { NetworkServices } from "Services";
import Config from "Config";
import { Snackbar } from "Components";

import { getFormattedString } from "Helper";

const AdminListing = props => {
  const classes = useStyles();
  const history = useHistory();
  const { data, keys, limit } = props;
  const [state, setState] = useState({
    isOpen: false,
    variant: "error",
    message: ""
  });

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
    await NetworkServices.delete(
      `${Config.SERVER_URL}/hospital/${element._id}`
    );
    setState({
      isOpen: true,
      variant: "error",
      message: `${element.hospitalName} Deleted`
    });

    history.go(0);
  };

  return (
    <div>
      <Snackbar
        errorMessage={state.message}
        isOpen={state.isOpen}
        variant={state.variant}
        handleClose={() => setState({ isOpen: false })}
      />
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
          style={{ textAlign: "center" }}
          color="textSecondary"
          variant="body1">
          No Data found
        </Typography>
      )}
    </div>
  );
};

export default AdminListing;

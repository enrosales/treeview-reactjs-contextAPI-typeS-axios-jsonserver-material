import React, { forwardRef } from 'react';
import { Icons } from 'material-table';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import Search from '@material-ui/icons/Search';
import ChevronRight from '@material-ui/icons/ChevronRight';
import AddBox from '@material-ui/icons/AddBox';

export const tableIcons: Icons = {
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
};

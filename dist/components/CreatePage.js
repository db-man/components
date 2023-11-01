/* eslint-disable react/destructuring-assignment, no-console, max-len, react/no-unused-class-component-methods */

import React, { useContext, useEffect, useState } from 'react';
import { message, Spin, Alert } from 'antd';
import { utils as githubUtils } from '@db-man/github';
import { validatePrimaryKey } from './Form/helpers';
import SuccessMessage from './SuccessMessage';
import * as utils from '../utils';
import Form from './Form';
import PageContext from '../contexts/page';
import * as constants from '../constants';
const CreatePage = () => {
  const {
    appModes,
    githubDb,
    dbName,
    tableName,
    primaryKey,
    columns
  } = useContext(PageContext);
  const [errorMessage, setErrorMessage] = useState('');
  // all rows in table file
  const [tableFileLoading, setTableFileLoading] = useState(false);
  // all rows in whole table, in split table mode, it's empty
  const [rows, setRows] = useState([]);
  const [tableFileSha, setTableFileSha] = useState(null);
  const [defaultFormValues, setDefaultFormValues] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    getData();
    const fields = getInitialFormFields();
    setDefaultFormValues({
      ...fields
    });
  }, []);

  // `updateTableFileAsync` to update the whole table file, it's too big, and take more time to get the response from server
  // `createRecordFileAsync` to only create record file, file is small, so get response quickly, but backend (github action) need to merge records into big table file
  const handleFormSubmit = formValues => {
    if (!isSplitTable()) {
      updateTableFileAsync(formValues);
    } else {
      createRecordFileAsync(formValues);
    }
  };
  const isSplitTable = () => {
    return appModes.indexOf('split-table') !== -1;
  };
  const updateTableFileAsync = async formValues => {
    const newContent = [...rows];
    if (!formValidation(rows, formValues)) {
      return;
    }
    const time = githubUtils.formatDate(new Date());
    newContent.push({
      ...formValues,
      createdAt: time,
      updatedAt: time
    });
    setSaveLoading(true);
    try {
      const _result = await githubDb?.updateTableFile(dbName, tableName, newContent, tableFileSha);
      if (_result) {
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: _result.commit.html_url
        }), 10);
      }
    } catch (err) {
      console.error('updateTableFile, err:', err);
      setErrorMessage('Failed to update table file on server!');
    }
    setSaveLoading(false);
  };
  const createRecordFileAsync = async formValues => {
    const time = githubUtils.formatDate(new Date());
    const record = {
      ...formValues,
      createdAt: time,
      updatedAt: time
    };
    setSaveLoading(true);
    try {
      const _result = await githubDb?.updateRecordFile(dbName, tableName, primaryKey, record, null // recordFileSha
      );

      if (_result) {
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: _result.commit.html_url
        }), 10);
      }
    } catch (err) {
      console.error('updateRecordFile, err:', err);
      setErrorMessage('Failed to create record file on server!');
    }
    setSaveLoading(false);
  };

  // Get single record file, the whole table file will be used to de-dup
  const getData = () => {
    const ps = [];
    // Whole table file is too big, so only get it when it's not split table
    if (!isSplitTable()) {
      ps.push(getTableFileAsync());
    }
    Promise.all(ps);
  };
  const getTableFileAsync = async () => {
    setTableFileLoading(true);
    try {
      const _result = await githubDb?.getTableRows(dbName, tableName);
      if (_result) {
        setRows(_result.content);
        setTableFileSha(_result.sha);
      }
    } catch (err) {
      console.error('getTableRows, error:', err);
      setErrorMessage('Failed to get table file from server!');
    }
    setTableFileLoading(false);
  };

  // Create the initial form fields
  const getInitialFormFields = () => {
    const fields = {};

    // Fill the form field with URL params
    columns.filter(col => utils.getUrlParams()[col.id]).forEach(col => {
      if (col.type === constants.STRING_ARRAY) {
        fields[col.id] = [utils.getUrlParams()[col.id]];
      } else {
        fields[col.id] = utils.getUrlParams()[col.id];
      }
    });
    return fields;
  };
  const formValidation = (rows, formValues) => {
    if (!validatePrimaryKey(formValues[primaryKey], rows, primaryKey)) {
      warnPrimaryKeyInvalid(formValues[primaryKey]);
      return false;
    }
    return true;
  };
  const warnPrimaryKeyInvalid = value => message.warning( /*#__PURE__*/React.createElement("div", null, "Found duplicated item in db", ' ', /*#__PURE__*/React.createElement("a", {
    href: `/${dbName}/${tableName}/update?${primaryKey}=${value}`
  }, value)), 10);
  if (defaultFormValues === null) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-page"
  }, /*#__PURE__*/React.createElement("h1", null, "Create ", dbName, " ", tableName), /*#__PURE__*/React.createElement("div", {
    className: "create-page-body-component"
  }, /*#__PURE__*/React.createElement(Spin, {
    spinning: tableFileLoading,
    tip: /*#__PURE__*/React.createElement("div", null, "Loading file:", ' ', /*#__PURE__*/React.createElement("a", {
      href: githubDb?.getDataUrl(dbName, tableName),
      target: "_blank",
      rel: "noreferrer"
    }, dbName, "/", tableName))
  }, errorMessage && /*#__PURE__*/React.createElement(Alert, {
    message: errorMessage,
    type: "error"
  }), /*#__PURE__*/React.createElement(Form, {
    defaultValues: defaultFormValues,
    rows: rows,
    loading: saveLoading,
    onSubmit: handleFormSubmit
  }))));
};
export default CreatePage;
//# sourceMappingURL=CreatePage.js.map
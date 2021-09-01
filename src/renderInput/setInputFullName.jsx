/* eslint-disable camelcase */
import React from "react"

const getDataDni = ({
  nombres,
  apellido_paterno,
  apellido_materno,
  formikCustom,
}) => {
  const formik = formikCustom
  React.useEffect(() => {
    if (nombres) {
      formik.setFieldValue("nombres", nombres)
      formik.setFieldValue("apellido_paterno", apellido_paterno)
      formik.setFieldValue("apellido_materno", apellido_materno)
      formik.setFieldValue(
        "fullName",
        `${nombres} ${apellido_paterno} ${apellido_materno}`
      )
    }
  }, [formik.setFieldValue, nombres, apellido_paterno, apellido_materno])

  return null
}

export default getDataDni

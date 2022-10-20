import React from 'react'
import axios from 'axios'
import CurrencyFormat from 'react-currency-format'

var url_base = process.env.REACT_APP_DB_HOST
var fecha = new Date()
var firstSale = ''
var mostrar = ''
var mostrarActual = ''

class TableRow extends React.Component {
  Percentages (value, string, rol) {
    var porc = 0

    if (value > 0.0001 && value < 0.5 && rol === 'vendedor') {
      porc = string === 'act' ? 0.004 : 0.008
    } else if (value > 0.51 && value < 0.6 && rol === 'vendedor') {
      porc = string === 'act' ? 0.005 : 0.0093
    } else if (value > 0.61 && value < 0.7 && rol === 'vendedor') {
      porc = string === 'act' ? 0.006 : 0.0095
    } else if (value > 0.71 && value < 0.8 && rol === 'vendedor') {
      porc = string === 'act' ? 0.006 : 0.0096
    } else if (value > 0.81 && value < 0.9 && rol === 'vendedor') {
      porc = string === 'act' ? 0.006 : 0.0098
    } else if (value > 0.91 && value < 1.0 && rol === 'vendedor') {
      porc = string === 'act' ? 0.006 : 0.0098
    } else if (value > 0.0001 && value < 0.5 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value > 0.51 && value < 0.6 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value > 0.61 && value < 0.7 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value > 0.71 && value < 0.8 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value > 0.81 && value < 0.9 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value > 0.91 && value < 1.0 && rol === 'coordinador') {
      porc = string === 'act' ? 0.001 : 0.0045
    } else if (value < 0.5 && rol === 'general') {
      porc = string === 'act' ? 0.004 : 0.008
    } else if (value > 0.51 && value < 0.6 && rol === 'general') {
      porc = string === 'act' ? 0.005 : 0.0093
    } else if (value > 0.61 && value < 0.7 && rol === 'general') {
      porc = string === 'act' ? 0.006 : 0.0095
    } else if (value > 0.71 && value < 0.8 && rol === 'general') {
      porc = string === 'act' ? 0.006 : 0.0096
    } else if (value > 0.81 && value < 0.9 && rol === 'general') {
      porc = string === 'act' ? 0.006 : 0.0098
    } else if (value > 0.91 && value < 1.0 && rol === 'general') {
      porc = string === 'act' ? 0.006 : 0.0098
    }
    return porc
  }

  calcularVentaEjecutada (e) {
    if (e != null) {
      var spl = e.split(',')
      if (spl.length > 1) {
        if (spl[1] !== '' && spl[1].charAt(spl[1].length - 1) !== '0') {
          var calculateNumber = e.replace(/\./g, '')
          var doubleNumber = calculateNumber.replace(/\,/g, '.')
          this.calcuVenEjec(doubleNumber, e)
        }
      }
      if (!e.includes(',')) {
        calculateNumber = e.replace(/\./g, '')
        this.calcuVenEjec(calculateNumber, e)
      }
    }
  }

  // CALCULAR VENTA MES

  calcuVenEjec (calculateNumber, e) {
    const item = this.props.item
    const itemAnterior = this.props.itemAnterior
    const rol = this.props.rol
    const allItems = this.props.allItems

    var num = parseFloat(calculateNumber)

    mostrar = e
    item.VentaEjecutada = num

    // month -> Mes
    // pptoVenta -> Ppto Mes
    // VentaEjecutada -> Venta Mes (Editable)
    // porcCumplimiento -> % Cump Ppto
    // ClienteActual -> Facturacion Actual (Editable2)
    // Porcentaje -> % / Venta Mes (1 columna)
    // ClienteNuevo -> Fact. Nueva
    // PorcentajeNuevo -> % / Venta Mes (2 columna)
    // PresupuestoAcumulado -> Ppto Mes Acumulado
    // ComisionAct -> Comision Fact Actual
    // ComisionNue -> Comision Fact Nueva
    // salarioTotal -> Basico + Comision

    var aux1 = 0
    var arrayaux = []

    allItems.map(element1 => {
      if (element1.month < item.month) {
        arrayaux.push(element1.VentaEjecutada)
      }
    })

    var maxnum = 0

    if (item.month !== '1') {
      maxnum = arrayaux.reduce(function (a, b) {
        return Math.max(a, b)
      }, -Infinity)

      if (item.VentaEjecutada > maxnum) {
        aux1 = maxnum
      } else {
        aux1 = item.VentaEjecutada
      }
    }

    if (item.month === '1') {
      item.pptoVenta = 0
      item.Porcentaje = 0
    }

    // % CUMP PPTO

    item.porcCumplimiento =
      item.PresupuestoAcumulado > item.VentaEjecutada
        ? item.VentaEjecutada / item.PresupuestoAcumulado
        : 0

    // FACT. ACTUAL

    if (item.month === '1') {
      item.ClienteActual = 0
    } else {
      if (item.VentaEjecutada > aux1) {
        item.ClienteActual = aux1
      } else {
        item.ClienteActual = item.VentaEjecutada
      }
    }

    // (% / VENTA MES) 1 COLUMNA

    item.Porcentaje =
      item.VentaEjecutada >= item.ClienteActual
        ? item.ClienteActual / item.VentaEjecutada
        : 0

    // FACT NUEVA

    item.ClienteNuevo = item.VentaEjecutada - item.ClienteActual

    // (% / VENTA MES) 2 COLUMNA

    item.PorcentajeNuevo =
      item.VentaEjecutada >= item.ClienteNuevo
        ? item.ClienteNuevo / item.VentaEjecutada
        : 0

    // PPTO MES ACUMULADO

    if (item.month === '1') {
      item.PresupuestoAcumulado = 0
    } else {
      item.PresupuestoAcumulado =
        itemAnterior.PresupuestoAcumulado +
        item.pptoVenta -
        itemAnterior.VentaEjecutada
    }

    // COMISION FACT. ACTUAL

    item.ComisionAct =
      this.Percentages(item.porcCumplimiento, 'act', rol) * item.ClienteActual

    // COMISION FACT. NUEVA


    item.ComisionNue =
      this.Percentages(item.porcCumplimiento, 'new', rol) * item.ClienteNuevo

    // BASICO + COMISION

    item.salarioTotal =
      item.ComisionAct + item.ComisionNue + parseInt(this.props.salarioMensual)

    this.props.updateItems(item, this.props.itemIndex)
  }

  /* calcularClienteFacturando (event) {
    if (event != null) {
      var spl = event.split(',')
      if (spl.length > 1) {
        if (spl[1] !== '' && spl[1].charAt(spl[1].length - 1) !== '0') {
          var calculateNumber = event.replace(/\./g, '')
          var doubleNumber = calculateNumber.replace(/\,/g, '.')
          this.calcu(doubleNumber, event)
        }
      }
      if (!event.includes(',')) {
        calculateNumber = event.replace(/\./g, '')
        this.calcu(calculateNumber, event)
      }
    }
  }

  // CALCULAR FACTURACION ACTUAL

  calcu (doubleNumber, event) {
    const item = this.props.item
    const itemAnterior =this.props.itemAnterior
    const rol = this.props.rol

    var number = parseFloat(doubleNumber)

    mostrarActual = event
    item.ClienteActual = number

    // FACTURACION ACTUAL

    var aux1 = 0

    if(itemAnterior.VentaEjecutada > item.VentaEjecutada){
      aux1 = itemAnterior.VentaEjecutada
    } else {
      aux1 = item.VentaEjecutada
    }

    

    

    // FACTURACION NUEVA

    item.ClienteNuevo = item.VentaEjecutada - item.ClienteActual

    // COMISION FACT ACTUAL


    // (% / VENTA MES)

   

    this.props.updateItems(item, this.props.itemIndex)
  } */

  sendData () {
    // Crear metodo de envio de informacion
    var infoLogin = this.props.infoLogin.username
    if (
      // infoLogin === 'elkin.moreno' ||
      infoLogin === 'jesus.montoya' ||
      infoLogin === 'juanpablo.tejada' ||
      infoLogin === 'ingry.marquez'
    ) {
      const item = this.props.item
      const representative = this.props.representative
      const monthSalary = parseFloat(this.props.salarioMensual)
      const pptoMensual = this.props.pptoMensual
      const pptoAnual = parseFloat(this.props.pptoAnual)
      var rol = this.props.rol
      var presupuestoAn = 0

      if (representative === 'general') {
        rol = 'general'
        presupuestoAn = pptoAnual / 4
      } else if (representative === 'Daniela') {
        presupuestoAn = pptoAnual / 4
      } else {
        presupuestoAn = pptoAnual
      }

      var request = '/api/tests/' + item.month + '/' + representative
      var info = {
        months: item.month,
        pptoVenta: item.pptoVenta,
        VentaEjecutada: item.VentaEjecutada,
        Cumplimiento: item.porcCumplimiento,
        VentaActual: item.ClienteActual,
        PorcentajeVentaActual: item.Porcentaje,
        VentaNueva: item.ClienteNuevo,
        PorcentajeVentaNueva: item.PorcentajeNuevo,
        PresupuestoAcumulado: item.PresupuestoAcumulado,
        ComisionAct: item.ComisionAct,
        ComisionNue: item.ComisionNue,
        salarioTotal: item.salarioTotal,
        usuarioLogueado: 'prueba',
        representante: representative,
        monthSalary: monthSalary,
        pptoMensual: pptoMensual,
        pptoAnual: presupuestoAn,
        rol: rol
      }
      axios.put(url_base + request, info).then(res => {
        this.setState({
          status: true
        })
      })
    }
  }

  render () {
    const item = this.props.item
    const itemAnterior = this.props.itemAnterior
    const rol = this.props.rol
    var inactiveMonth = false
    var infoLogin = this.props.infoLogin.username

    if (
      item.month < fecha.getMonth() + 1 &&
      infoLogin !== 'elkin.moreno' &&
      infoLogin !== 'jesus.montoya' &&
      infoLogin !== 'juanpablo.tejada' &&
      infoLogin !== 'ingry.marquez'
    ) {
      inactiveMonth = true
    }

    /* this.mostrarActual = item.ClienteActual

    item.porcCumplimiento = item.VentaEjecutada / item.PresupuestoAcumulado

    if (isNaN(item.porcCumplimiento)) {
      item.porcCumplimiento = 0
    }

    item.Porcentaje = item.ClienteActual / item.VentaEjecutada

    item.PorcentajeNuevo = 1 - item.Porcentaje

    item.ComisionAct =
      item.ClienteActual * this.Percentages(item.porcCumplimiento, 'act', rol)

    if (isNaN(item.ComisionAct)) {
      item.ComisionAct = 0
    }

    item.ClienteNuevo = item.VentaEjecutada * item.PorcentajeNuevo

    if (isNaN(item.ClienteNuevo)) {
      item.ClienteNuevo = 0
    }

    item.ComisionNue =
      item.ClienteNuevo * this.Percentages(item.porcCumplimiento, 'new', rol)

    if (item.ComisionNue < 0) {
      item.ComisionNue = 0
    }

    item.salarioTotal =
      item.ComisionAct + item.ComisionNue + parseInt(this.props.salarioMensual)

    if (itemAnterior === null && parseInt(item.month) === 2) {
      item.PresupuestoAcumulado = item.pptoVenta
    } else if (itemAnterior !== null && parseInt(item.month) > 2) {
      if (item.month === 3 && rol === 'coordinador') {
        item.PresupuestoAcumulado =
          item.pptoVenta +
          itemAnterior.PresupuestoAcumulado -
          firstSale -
          itemAnterior.VentaEjecutada
      } else {
        item.PresupuestoAcumulado =
          item.pptoVenta +
          itemAnterior.PresupuestoAcumulado -
          itemAnterior.VentaEjecutada
      }
    }

    //////////////////////////////////////////////////////////////////// 
    */


    if (isNaN(item.pptoVenta) || item.pptoVenta === null) {
      item.pptoVenta = 0
    }

    const presuVenta = Math.trunc(item.pptoVenta).toLocaleString('es-CO')

    if (isNaN(item.porcCumplimiento) || item.porcCumplimiento === null) {
      item.porcCumplimiento = 0
    }

    var porcentajeCumpli = Math.round(item.porcCumplimiento * 100)

    if (isNaN(item.ClienteActual) || item.ClienteActual === null) {
      item.ClienteActual = 0
    }

    var factActual = Math.trunc(item.ClienteActual).toLocaleString('es-CO')

    if (isNaN(item.Porcentaje) || item.Porcentaje === null) {
      item.Porcentaje = 0
    }

    var porcentajeActu = Math.round(item.Porcentaje * 100)

    if (isNaN(item.ClienteNuevo) || item.ClienteNuevo === null) {
      item.ClienteNuevo = 0
    }

    var ventaClienteNuevo = item.ClienteNuevo.toLocaleString('es-CO')

    if (isNaN(item.PorcentajeNuevo) || item.PorcentajeNuevo === null) {
      item.PorcentajeNuevo = 0
    }

    var porcentajeVentaNueva = Math.round(item.PorcentajeNuevo * 100)

    if (
      isNaN(item.PresupuestoAcumulado) ||
      item.PresupuestoAcumulado === null
    ) {
      item.PresupuestoAcumulado = 0
    }

    var presupuestoAcum = Math.trunc(item.PresupuestoAcumulado).toLocaleString(
      'es-CO'
    )

    if (isNaN(item.ComisionAct) || item.ComisionAct === null) {
      item.ComisionAct = 0
    }

    var comiActualPesos = Math.trunc(item.ComisionAct).toLocaleString('es-CO')

    if (isNaN(item.ComisionNue) || item.ComisionNue === null) {
      item.ComisionNue = 0
    }

    var comiNuevaPesos = Math.trunc(item.ComisionNue).toLocaleString('es-CO')

    if (isNaN(item.salarioTotal) || item.salarioTotal === null) {
      item.salarioTotal = 0
    }

    var salarioPesos = Math.trunc(item.salarioTotal).toLocaleString('es-CO')

    ///////////////////////////////////////////////////////

    // ------------------------------ STYLES --------------------------

    // ----------------------------- CODE HTML RETURN -------------------

    if (item.month === 1) {
      return (
        <>
          <tr>
            <td>{item.month}</td>
            <td>-</td>
            <td>
              <CurrencyFormat
                placeholder='Ingrese valor'
                type='text'
                thousandSeparator='.'
                decimalSeparator=','
                decimalScale={0}
                className='form-control form-control-sm CurrencyInput'
                onChange={e => this.calcularVentaEjecutada(e.target.value)}
                value={
                  item.VentaEjecutada === 0 || isNaN(item.VentaEjecutada)
                    ? ''
                    : item.VentaEjecutada
                }
                onBlur={() => this.sendData(item)}
                id={`VentaEjecutada${item.month}`}
                min='0'
                disabled={inactiveMonth}
                inputstyle={{ border: 'none', width: '120%' }}
              />
            </td>
            {/* Venta Ejecutada */}
            <td> - %</td>
            <td> - </td>
            <td> - %</td>
            <td> - </td>
            <td> - %</td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
          </tr>
        </>
      )
    }

    return (
      <>
        <tr>
          <td>{item.month}</td>
          <td>{presuVenta}</td>
          <td>
            <div className='input-group'>
              <CurrencyFormat
                placeholder='Ingrese valor'
                type='text'
                thousandSeparator='.'
                decimalSeparator=','
                decimalScale={0}
                className='form-control form-control-sm CurrencyInput'
                onChange={e => this.calcularVentaEjecutada(e.target.value)}
                value={
                  item.VentaEjecutada === 0 || isNaN(item.VentaEjecutada)
                    ? ''
                    : item.VentaEjecutada
                }
                onBlur={() => this.sendData(item)}
                id={`VentaEjecutada${item.month}`}
                min='0'
                disabled={inactiveMonth}
                inputstyle={{ border: 'none', width: '120%' }}
              />
            </div>
          </td>
          {/* Venta Ejecutada */}
          <td>{porcentajeCumpli + '%'}</td>
          <td>{factActual}</td>
          {/* Cliente Facturando */}
          <td>{porcentajeActu + '%'}</td>
          <td>{ventaClienteNuevo}</td>
          <td>{porcentajeVentaNueva + '%'}</td>
          <td>{presupuestoAcum}</td>
          <td>{comiActualPesos}</td>
          <td>{comiNuevaPesos}</td>
          <td>{salarioPesos}</td>
        </tr>
      </>
    )
  }
}

export default TableRow

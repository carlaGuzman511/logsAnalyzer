from .tables.apache_error_log import ApacheErrorLog
from .tables.ftp_log import FtpLog
from .tables.apache_access_log import ApacheAccessLog

def get_apache_access_logs():
    apache_access_logs = ApacheAccessLog.select().dicts()

    return list(apache_access_logs)
        
def get_apache_error_logs():
    apache_error_logs = ApacheErrorLog.select().dicts()

    return list(apache_error_logs)

def get_vsftpd_logs():
    ftp_log = FtpLog.select().dicts()

    return list(ftp_log)


# 1. Doctor que atendio mas citas medicas en una determinada fecha

# query = (Empleado
#          .select(Empleado.idempleado, fn.COUNT(CitaMedica.idempleado).alias('ct'))
#          .join(CitaMedica, JOIN.LEFT_OUTER, on=(Empleado.idempleado == CitaMedica.idempleado))
#          .group_by(Empleado.idempleado)
#          .order_by(fn.COUNT(CitaMedica.idempleado).desc()).execute())
# print(type(query))
# for q in query:
#     print(q.idempleado, Empleado.get(Empleado.idempleado==q.idempleado).nombre)

# 2. Paciente que tuvo mas citas medicas en un determinado periodo de tiempo

# query1 = (Paciente.select(Paciente.pac_idpersona, fn.COUNT(CitaMedica.idpersona).alias('cm'))
#           .join(CitaMedica, JOIN.LEFT_OUTER, on=(Paciente.pac_idpersona == CitaMedica.idpersona))
#           .group_by(Paciente.pac_idpersona)
#           .where(CitaMedica.fecha>='2019-04-01' and CitaMedica.fecha<='2019-05-31' and Paciente.pac_idpersona==5817943).execute())
# print(query1)
# for q1 in query1:
#     print(q1.pac_idpersona, q1.cm)

# 3. La especialidad con mayores citas medicas deacuerdo a un rango de fechas dado

# query2 = (Especialidad.select(Especialidad.idespecialidad, Especialidad.descripcion)
#           .where(Especialidad.idespecialidad in (
#                 Empleado.select(Empleado.idespecialidad)
#                 .join(CitaMedica, JOIN.LEFT_OUTER, on=(Empleado.idempleado == CitaMedica.idempleado))
#                 .where(CitaMedica.fecha>='2019-01-01' and CitaMedica.fecha<='2019-12-31')
#                 .group_by(Empleado.idespecialidad).execute())).execute())
# print(query2)
# for q2 in query2:
#     print(q2.descripcion)

# 4. Crear varias tuplas a la misma vez en una sola transaccion

# data_source = [
#     {'idcita_medica': 'CM0051', 'idpaciente':8, 'idpersona': 6787232, 'idempleado':1, 'fecha':'2019-12-07', 'hora_inicio':'14:00:00', 'hora_fin':'15:00:00'},
# {'idcita_medica': 'CM0052', 'idpaciente':8, 'idpersona': 6787232, 'idempleado':1, 'fecha':'2019-12-08', 'hora_inicio':'14:00:00', 'hora_fin':'15:00:00'},
# {'idcita_medica': 'CM0053', 'idpaciente':8, 'idpersona': 6787232, 'idempleado':1, 'fecha':'2019-12-09', 'hora_inicio':'14:00:00', 'hora_fin':'15:00:00'},
# {'idcita_medica': 'CM0054', 'idpaciente':8, 'idpersona': 6787232, 'idempleado':1, 'fecha':'2019-12-10', 'hora_inicio':'14:00:00', 'hora_fin':'15:00:00'},
# {'idcita_medica': 'CM0055', 'idpaciente':8, 'idpersona': 6787232, 'idempleado':1, 'fecha':'2019-12-11', 'hora_inicio':'14:00:00', 'hora_fin':'15:00:00'}
# ]
# CitaMedica.insert_many(data_source).execute()

# 5 Devuelve el historial del sueldo de un cargo
# query5 = (Cargo.select(Cargo.descripcion)
#           .where(Cargo.idcargo in (
#                 HistorialSueldo.select(HistorialSueldo.idcargo, HistorialSueldo.puntos_sueldo, HistorialSueldo.fecha, HistorialSueldo.activo)
#                 .where(HistorialSueldo.idhistorial_sueldo in (
#                     Puntaje.select(Puntaje.idhistorial_sueldo, Puntaje.puntos_moneda)
#                 )))and Cargo.descripcion=='ENFERMERO').execute())

# print(query5)
# for q5 in query5:
#     print(q5.descripcion, q5)

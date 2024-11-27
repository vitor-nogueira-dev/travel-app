import { IDriver } from "../../../src/interfaces/IDriver"
import { IRideSave } from "../../../src/interfaces/IRide"

export const driveByMinKm = [{
  id: 2,
  name: 'Dominic Toretto',
  description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
  vehicle: 'Dodge Charger R/T 1970 modificado',
  rating: 4,
  rate_per_km: '5.00',
  min_distance_km: 5
}]

export const driverData: IDriver[] = [
  {
    "id": 1,
    "name": "Homer Simpson",
    "description": "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    "vehicle": "Plymouth Valiant 1973 rosa e enferrujado",
    "rating": 2,
    "comment": "Avaliação disponível",
    "value": 2.5,
    "min_distance_km": 1
  },
  {
    "id": 2,
    "name": "Dominic Toretto",
    "description": "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    "vehicle": "Dodge Charger R/T 1970 modificado",
    "rating": 4,
    "comment": "Avaliação disponível",
    "value": 5,
    "min_distance_km": 5
  },
  {
    "id": 3,
    "name": "James Bond",
    "description": "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    "vehicle": "Aston Martin DB5 clássico",
    "rating": 5,
    "comment": "Avaliação disponível",
    "value": 10,
    "min_distance_km": 10
  }
]

export const drivers = [
  {
    "id": 1,
    "name": "Homer Simpson",
    "description": "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    "vehicle": "Plymouth Valiant 1973 rosa e enferrujado",
    "review": {
      "rating": 2
    },
    "value": 2.5
  },
  {
    "id": 2,
    "name": "Dominic Toretto",
    "description": "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    "vehicle": "Dodge Charger R/T 1970 modificado",
    "review": {
      "rating": 4
    },
    "value": 5
  },
  {
    "id": 3,
    "name": "James Bond",
    "description": "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    "vehicle": "Aston Martin DB5 clássico",
    "review": {
      "rating": 5
    },
    "value": 10
  }
]

export const ride: IRideSave = {
  "id": 1,
  "customer_id": 1,
  "date": new Date("2021-09-01T10:00:00"),
  "destination": "Casa do Homer",
  "origin": "Casa do Ned",
  "distance": 10,
  "duration": 20,
  "driver": {
    "id": 1,
    "name": "Homer Simpson",
  },
  "value": 20
}

export const ridesByCustomer = [
  {
    id: 32,
    date: "2024-11-25T10:25:44.000Z",
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver_id: 3,
    driver_name: 'James Bond',
    value: '557.13'
  },
  {
    id: 31,
    date: "2024-11-25T10:22:48.000Z",
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver_id: 2,
    driver_name: 'Dominic Toretto',
    value: '278.57'
  },
  {
    id: 34,
    date: "2024-11-25T07:31:41.000Z",
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver_id: 1,
    driver_name: 'Homer Simpson',
    value: '139.28'
  }
]

export const rideResultByCustomer = [
  {
    id: 32,
    date: '2024-11-25T10:25:44.000Z',
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver: { id: 3, name: 'James Bond' },
    value: 557.13
  },
  {
    id: 31,
    date: '2024-11-25T10:22:48.000Z',
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver: { id: 2, name: 'Dominic Toretto' },
    value: 278.57
  },
  {
    id: 34,
    date: '2024-11-25T07:31:41.000Z',
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver: { id: 1, name: 'Homer Simpson' },
    value: 139.28
  }
]

export const rideByCustomerAndDriver = [
  {
    id: 32,
    date: "2024-11-25T10:25:44.000Z",
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver_id: 3,
    driver_name: 'James Bond',
    value: '557.13'
  }
]

export const rideResultByCustomerAndDriver = [
  {
    id: 32,
    date: '2024-11-25T10:25:44.000Z',
    origin: 'Rua José Josino de Oliveira, 6, Barbacena',
    destination: 'Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni',
    distance: 55.7130012512207,
    duration: '52m 5s',
    driver: { id: 3, name: 'James Bond' },
    value: 557.13
  }
]

export const apiMapsResponse = {
  data: {
    routes: [
      {
        "distanceMeters": 55281,
        "duration": "3109s",
        "polyline": {
          "encodedPolyline": "xbb~BzgljGr@gCHSEy@A{AC[GSrD}Fd@oAZBXIPULKb@c@BMACbFgCvBaAnAc@dCk@`IuAt@SlCgAlAw@fAw@zCiCjHyGjEoDzHuF~@s@xA_BhDwEVOr@w@fAy@~@c@|Ac@bOgClIsA`Fy@h@GfAClA@j@BpAL^?n\\~GpDx@pA\\t@XhAf@r@^fEtCLTrBtAzBdAx@T~AVl@BdB?t@G|@Kt@S`Bo@hBaAvOmKjE}CnDaDpB{AjAu@p@[j@Sr@Kx@El@?v@Hp@Jv@Xd@ZtBlBp@b@dAd@zA`@|@JhEBpANlAZlB|@NHPBdKfJr@`@f@NlC`@zAPrA@vBOlC_@jEq@PBfAEfAHpAT`AZv@\\p@b@jAdAd@n@^t@P^NNl@fBdGjSx@pB~@|AlDxEnPhT|AbB|FjElBhBtDjElDhEbCtCxBjC|ArAtBxAh@T~G`F|EjDzAnA~AfBhAfBx@~Ap@hBfC|FbEvJr@fAn@n@t@d@lA`@^JrBXb@HhD^rAVhHv@pAHzEp@z@DbFr@jBd@zAh@nBj@p@JfA@PAfASjCgAhD_BhPiIxHsDr@a@N?zB_AxAg@lBa@~Es@vA_@lBy@fBkAlDgCjBmALSpIoFzGsErAw@zAq@`Cw@~^yJbB]|GcBrA_@bBa@bL}CbAe@h@_@bR}O|@}@xDaD~JkHhAw@jAaAhAmAf@y@fAyCb@cB|B{K~AcJJiABeAGeO@wAJcAXoANg@\\m@vAkBNONG|@_AjA}@z@u@`AwAV_@BIdKiKpHcItDqDlAw@z@]tA]v@GpA?dBNdDJb@A|AYz@_@jHiExNsI`Bw@zWkHjXoHpFcBvHuB`EiAj@U`Ak@j@g@Za@pCsEn@s@t@i@r@]tA_@d@GpFI`OKpDA~LKjF?p@FvAZlHhBdBX`BHnACfBQrAY|Am@`Ag@jGgE`SsNfD_CfAo@jAg@v@YxEoArAWlAMt@Cn@DtAV~@`@jDxBjBrAzCjCrBpBzFlFlBrArHnEpBx@rA\\pb@vHbDd@|AHrA@vk@kBbA?bDH|PdANDh@DdA@`AOx@Qn@W`@U`@[HO|GwFrKeJ|BsBbAcA`@i@vAuB~Uwd@n@{AXcA`@}AfHq[^uAXs@Zk@Zc@fAoAjHmHzA}ApJcJNAr@i@t@[h@OhAQZCf@?bBPfAZdAh@^XxA~ArEnFtAjAbAd@fARn@HpA@fACTIrF]`Fc@`ACvAJ~O|CbAJfA@`AI|@OlA_@tAs@dGcF|@i@bA_@dAQ|@GvAB|BNdARjC~@xBr@p@\\dAr@b@h@T\\Xt@`@|ArBpKpAhGX|@^p@dArAj@f@fAr@vGpDnB|@|@\\xAZx@JxAFjCApGUx@I`@IlAg@`Au@~@cA\\e@l@kA\\aAHi@FoAFuDF}@Fc@Vw@b@u@^a@j@]t@WXEt@AtDTdDV|Ev@lCl@hEnAtTnHzBbAxBrArAnAf@h@bGfIrAdBl@b@|@d@~@Vb@Jh@FpA@vAQpBe@lIgCbF{Ah@ObDkAdDwArBaApEoCdG_EhD}BrHwEtB}AdCgC~B{CtB{CdFwG~@}@tAeA|@_@xAg@r@KxAK`D@fNRrAAr@G~ASpDcAbJcDpFcBhB[n@Gdh@cBrCMdEGbCFtIl@xFd@x@Jd@Ll@RpAn@pAt@~NtHrJlFhCfAdCl@j@JfAL`Gd@tAN|AXzAp@`Al@|BzBbDjDrArAb@\\b@XjA`@hARjBJdEFnC@X@p@G`ASfFkA|@KnAA\\Ej@O~HcE|As@vDuAl@]lB{Av@g@|CeApAi@`Bc@t@MbACpAFtD\\bCN|D@~CMxAOnBa@pH{B|@UtEcApD_ApAg@bB{@bBaAjAc@\\KfBQjAGtAS~@]z@k@~@eAtFuHh@k@h@]d@Q`@GtIs@|TsAbCIpAAvLD~PXJFtAB~CIlAKrB[zAg@`Ao@tE{Dp@o@b@o@Zk@`@k@j@k@FQdAu@f@Uv@Up@IfBQtBg@`GeCzA]lAK`AAhKJnDAjACfCSdCa@x@SnA_@~CyAbGcDlBaAz@]dBi@X@fCi@nAMfCCnGLhAD`DBfBPtC^~ABtAGdGk@lAEp@B`Df@PRxDlA^JnARd@Tf@j@TJT@ZI^UNSl@g@^OlKUV?n@HZVz@d@VRVb@jCrGfBzEr@dBfA~C`@dB`@zCFvADrNG`Q@bF?pNElKCjAHhFAZM`@[`@o@fAwEfHxBVrMfAmBzVF`@DDHBHLPBLIBIPNdCfHd@bBhC|HtCK~AMSbGSH"
        }
      }
    ]
  }
}

export const decodedPolyline = [[-20.82365, -43.81326], [-21.21791, -43.78022]]

export const rideEstimate = {
  "origin": {
    "latitude": -20.82365,
    "longitude": -43.81326
  },
  "destination": {
    "latitude": -21.21791,
    "longitude": -43.78022
  },
  "distance": 55.281,
  "duration": "51m 49s",
  "options": [
    {
      "id": 1,
      "name": "Homer Simpson",
      "description": "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      "vehicle": "Plymouth Valiant 1973 rosa e enferrujado",
      "review": {
        "rating": 2,
        "comment": "Avaliação disponível"
      },
      "value": 2.5
    },
  ],
  "routeResponse": {
    "distanceMeters": 55281,
    "duration": "3109s",
    "polyline": {
      "encodedPolyline": "xbb~BzgljGr@gCHSEy@A{AC[GSrD}Fd@oAZBXIPULKb@c@BMACbFgCvBaAnAc@dCk@`IuAt@SlCgAlAw@fAw@zCiCjHyGjEoDzHuF~@s@xA_BhDwEVOr@w@fAy@~@c@|Ac@bOgClIsA`Fy@h@GfAClA@j@BpAL^?n\\~GpDx@pA\\t@XhAf@r@^fEtCLTrBtAzBdAx@T~AVl@BdB?t@G|@Kt@S`Bo@hBaAvOmKjE}CnDaDpB{AjAu@p@[j@Sr@Kx@El@?v@Hp@Jv@Xd@ZtBlBp@b@dAd@zA`@|@JhEBpANlAZlB|@NHPBdKfJr@`@f@NlC`@zAPrA@vBOlC_@jEq@PBfAEfAHpAT`AZv@\\p@b@jAdAd@n@^t@P^NNl@fBdGjSx@pB~@|AlDxEnPhT|AbB|FjElBhBtDjElDhEbCtCxBjC|ArAtBxAh@T~G`F|EjDzAnA~AfBhAfBx@~Ap@hBfC|FbEvJr@fAn@n@t@d@lA`@^JrBXb@HhD^rAVhHv@pAHzEp@z@DbFr@jBd@zAh@nBj@p@JfA@PAfASjCgAhD_BhPiIxHsDr@a@N?zB_AxAg@lBa@~Es@vA_@lBy@fBkAlDgCjBmALSpIoFzGsErAw@zAq@`Cw@~^yJbB]|GcBrA_@bBa@bL}CbAe@h@_@bR}O|@}@xDaD~JkHhAw@jAaAhAmAf@y@fAyCb@cB|B{K~AcJJiABeAGeO@wAJcAXoANg@\\m@vAkBNONG|@_AjA}@z@u@`AwAV_@BIdKiKpHcItDqDlAw@z@]tA]v@GpA?dBNdDJb@A|AYz@_@jHiExNsI`Bw@zWkHjXoHpFcBvHuB`EiAj@U`Ak@j@g@Za@pCsEn@s@t@i@r@]tA_@d@GpFI`OKpDA~LKjF?p@FvAZlHhBdBX`BHnACfBQrAY|Am@`Ag@jGgE`SsNfD_CfAo@jAg@v@YxEoArAWlAMt@Cn@DtAV~@`@jDxBjBrAzCjCrBpBzFlFlBrArHnEpBx@rA\\pb@vHbDd@|AHrA@vk@kBbA?bDH|PdANDh@DdA@`AOx@Qn@W`@U`@[HO|GwFrKeJ|BsBbAcA`@i@vAuB~Uwd@n@{AXcA`@}AfHq[^uAXs@Zk@Zc@fAoAjHmHzA}ApJcJNAr@i@t@[h@OhAQZCf@?bBPfAZdAh@^XxA~ArEnFtAjAbAd@fARn@HpA@fACTIrF]`Fc@`ACvAJ~O|CbAJfA@`AI|@OlA_@tAs@dGcF|@i@bA_@dAQ|@GvAB|BNdARjC~@xBr@p@\\dAr@b@h@T\\Xt@`@|ArBpKpAhGX|@^p@dArAj@f@fAr@vGpDnB|@|@\\xAZx@JxAFjCApGUx@I`@IlAg@`Au@~@cA\\e@l@kA\\aAHi@FoAFuDF}@Fc@Vw@b@u@^a@j@]t@WXEt@AtDTdDV|Ev@lCl@hEnAtTnHzBbAxBrArAnAf@h@bGfIrAdBl@b@|@d@~@Vb@Jh@FpA@vAQpBe@lIgCbF{Ah@ObDkAdDwArBaApEoCdG_EhD}BrHwEtB}AdCgC~B{CtB{CdFwG~@}@tAeA|@_@xAg@r@KxAK`D@fNRrAAr@G~ASpDcAbJcDpFcBhB[n@Gdh@cBrCMdEGbCFtIl@xFd@x@Jd@Ll@RpAn@pAt@~NtHrJlFhCfAdCl@j@JfAL`Gd@tAN|AXzAp@`Al@|BzBbDjDrArAb@\\b@XjA`@hARjBJdEFnC@X@p@G`ASfFkA|@KnAA\\Ej@O~HcE|As@vDuAl@]lB{Av@g@|CeApAi@`Bc@t@MbACpAFtD\\bCN|D@~CMxAOnBa@pH{B|@UtEcApD_ApAg@bB{@bBaAjAc@\\KfBQjAGtAS~@]z@k@~@eAtFuHh@k@h@]d@Q`@GtIs@|TsAbCIpAAvLD~PXJFtAB~CIlAKrB[zAg@`Ao@tE{Dp@o@b@o@Zk@`@k@j@k@FQdAu@f@Uv@Up@IfBQtBg@`GeCzA]lAK`AAhKJnDAjACfCSdCa@x@SnA_@~CyAbGcDlBaAz@]dBi@X@fCi@nAMfCCnGLhAD`DBfBPtC^~ABtAGdGk@lAEp@B`Df@PRxDlA^JnARd@Tf@j@TJT@ZI^UNSl@g@^OlKUV?n@HZVz@d@VRVb@jCrGfBzEr@dBfA~C`@dB`@zCFvADrNG`Q@bF?pNElKCjAHhFAZM`@[`@o@fAwEfHxBVrMfAmBzVF`@DDHBHLPBLIBIPNdCfHd@bBhC|HtCK~AMSbGSH"
    }
  }
}

export const rideBodyConfirm = {
  "customer_id": "123",
  "origin": "Rua José Josino de Oliveira, 6, Barbacena",
  "destination": "Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni",
  "distance": 55.713,
  "duration": "52m 5s",
  "driver": {
    "id": 2,
    "name": "Dominic Toretto"
  },
  "value": 278.565
}

export const ridyBodyEstimate = {
  customer_id: 1,
  origin: "Rua José Josino de Oliveira, 6, Barbacena",
  destination: "Rua Vitalino Rosa de Carvalho, 42, Cristiano Otoni",
}
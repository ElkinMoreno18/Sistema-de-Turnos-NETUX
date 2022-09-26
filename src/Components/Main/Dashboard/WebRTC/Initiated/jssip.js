/*
 * JsSIP v3.9.1
 * the Javascript SIP library
 * Copyright: 2012-2022
 * Homepage: https://jssip.net
 * License: MIT
 */
/* eslint-disable */
!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = e()
  else if ('function' == typeof define && define.amd) define([], e)
  else {
    ;('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : this
    ).JsSIP = e()
  }
})(function () {
  return (function () {
    return function e (t, n, r) {
      function s (o, l) {
        if (!n[o]) {
          if (!t[o]) {
            var u = 'function' == typeof require && require
            if (!l && u) return u(o, !0)
            if (i) return i(o, !0)
            var a = new Error("Cannot find module '" + o + "'")
            throw ((a.code = 'MODULE_NOT_FOUND'), a)
          }
          var c = (n[o] = { exports: {} })
          t[o][0].call(
            c.exports,
            function (e) {
              return s(t[o][1][e] || e)
            },
            c,
            c.exports,
            e,
            t,
            n,
            r
          )
        }
        return n[o].exports
      }
      for (
        var i = 'function' == typeof require && require, o = 0;
        o < r.length;
        o++
      )
        s(r[o])
      return s
    }
  })()(
    {
      1: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return s(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return s(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  i = function () {}
                return {
                  s: i,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: i
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function s (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          var i = e('./Utils'),
            o = e('./Constants'),
            l = e('./Grammar'),
            u = e('./URI'),
            a = e('./Socket'),
            c = e('./Exceptions')
          n.settings = {
            authorization_user: null,
            password: null,
            realm: null,
            ha1: null,
            authorization_jwt: null,
            display_name: null,
            uri: null,
            contact_uri: null,
            instance_id: null,
            use_preloaded_route: !1,
            session_timers: !0,
            session_timers_refresh_method: o.UPDATE,
            session_timers_force_refresher: !1,
            no_answer_timeout: 60,
            register: !0,
            register_expires: 600,
            registrar_server: null,
            sockets: null,
            connection_recovery_max_interval:
              o.CONNECTION_RECOVERY_MAX_INTERVAL,
            connection_recovery_min_interval:
              o.CONNECTION_RECOVERY_MIN_INTERVAL,
            via_host: ''.concat(i.createRandomToken(12), '.invalid')
          }
          var h = {
            mandatory: {
              sockets: function (e) {
                var t = []
                if (a.isSocket(e)) t.push({ socket: e })
                else {
                  if (!Array.isArray(e) || !e.length) return
                  var n,
                    s = r(e)
                  try {
                    for (s.s(); !(n = s.n()).done; ) {
                      var i = n.value
                      Object.prototype.hasOwnProperty.call(i, 'socket') &&
                      a.isSocket(i.socket)
                        ? t.push(i)
                        : a.isSocket(i) && t.push({ socket: i })
                    }
                  } catch (e) {
                    s.e(e)
                  } finally {
                    s.f()
                  }
                }
                return t
              },
              uri: function (e) {
                ;/^sip:/i.test(e) || (e = ''.concat(o.SIP, ':').concat(e))
                var t = u.parse(e)
                return t && t.user ? t : void 0
              }
            },
            optional: {
              authorization_user: function (e) {
                return -1 === l.parse('"'.concat(e, '"'), 'quoted_string')
                  ? void 0
                  : e
              },
              authorization_jwt: function (e) {
                if ('string' == typeof e) return e
              },
              user_agent: function (e) {
                if ('string' == typeof e) return e
              },
              connection_recovery_max_interval: function (e) {
                if (i.isDecimal(e)) {
                  var t = Number(e)
                  if (t > 0) return t
                }
              },
              connection_recovery_min_interval: function (e) {
                if (i.isDecimal(e)) {
                  var t = Number(e)
                  if (t > 0) return t
                }
              },
              contact_uri: function (e) {
                if ('string' == typeof e) {
                  var t = l.parse(e, 'SIP_URI')
                  if (-1 !== t) return t
                }
              },
              display_name: function (e) {
                return e
              },
              instance_id: function (e) {
                return (
                  /^uuid:/i.test(e) && (e = e.substr(5)),
                  -1 === l.parse(e, 'uuid') ? void 0 : e
                )
              },
              no_answer_timeout: function (e) {
                if (i.isDecimal(e)) {
                  var t = Number(e)
                  if (t > 0) return t
                }
              },
              session_timers: function (e) {
                if ('boolean' == typeof e) return e
              },
              session_timers_refresh_method: function (e) {
                if (
                  'string' == typeof e &&
                  ((e = e.toUpperCase()) === o.INVITE || e === o.UPDATE)
                )
                  return e
              },
              session_timers_force_refresher: function (e) {
                if ('boolean' == typeof e) return e
              },
              password: function (e) {
                return String(e)
              },
              realm: function (e) {
                return String(e)
              },
              ha1: function (e) {
                return String(e)
              },
              register: function (e) {
                if ('boolean' == typeof e) return e
              },
              register_expires: function (e) {
                if (i.isDecimal(e)) {
                  var t = Number(e)
                  if (t > 0) return t
                }
              },
              registrar_server: function (e) {
                ;/^sip:/i.test(e) || (e = ''.concat(o.SIP, ':').concat(e))
                var t = u.parse(e)
                return t ? (t.user ? void 0 : t) : void 0
              },
              use_preloaded_route: function (e) {
                if ('boolean' == typeof e) return e
              }
            }
          }
          n.load = function (e, t) {
            for (var n in h.mandatory) {
              if (!t.hasOwnProperty(n)) throw new c.ConfigurationError(n)
              var r = t[n],
                s = h.mandatory[n](r)
              if (void 0 === s) throw new c.ConfigurationError(n, r)
              e[n] = s
            }
            for (var o in h.optional)
              if (t.hasOwnProperty(o)) {
                var l = t[o]
                if (i.isEmpty(l)) continue
                var u = h.optional[o](l)
                if (void 0 === u) throw new c.ConfigurationError(o, l)
                e[o] = u
              }
          }
        },
        {
          './Constants': 2,
          './Exceptions': 6,
          './Grammar': 7,
          './Socket': 22,
          './URI': 27,
          './Utils': 28
        }
      ],
      2: [
        function (e, t, n) {
          'use strict'
          var r = e('../package.json')
          t.exports = {
            USER_AGENT: ''.concat(r.title, ' ').concat(r.version),
            SIP: 'sip',
            SIPS: 'sips',
            causes: {
              CONNECTION_ERROR: 'Connection Error',
              REQUEST_TIMEOUT: 'Request Timeout',
              SIP_FAILURE_CODE: 'SIP Failure Code',
              INTERNAL_ERROR: 'Internal Error',
              BUSY: 'Busy',
              REJECTED: 'Rejected',
              REDIRECTED: 'Redirected',
              UNAVAILABLE: 'Unavailable',
              NOT_FOUND: 'Not Found',
              ADDRESS_INCOMPLETE: 'Address Incomplete',
              INCOMPATIBLE_SDP: 'Incompatible SDP',
              MISSING_SDP: 'Missing SDP',
              AUTHENTICATION_ERROR: 'Authentication Error',
              BYE: 'Terminated',
              WEBRTC_ERROR: 'WebRTC Error',
              CANCELED: 'Canceled',
              NO_ANSWER: 'No Answer',
              EXPIRES: 'Expires',
              NO_ACK: 'No ACK',
              DIALOG_ERROR: 'Dialog Error',
              USER_DENIED_MEDIA_ACCESS: 'User Denied Media Access',
              BAD_MEDIA_DESCRIPTION: 'Bad Media Description',
              RTP_TIMEOUT: 'RTP Timeout'
            },
            SIP_ERROR_CAUSES: {
              REDIRECTED: [300, 301, 302, 305, 380],
              BUSY: [486, 600],
              REJECTED: [403, 603],
              NOT_FOUND: [404, 604],
              UNAVAILABLE: [480, 410, 408, 430],
              ADDRESS_INCOMPLETE: [484, 424],
              INCOMPATIBLE_SDP: [488, 606],
              AUTHENTICATION_ERROR: [401, 407]
            },
            ACK: 'ACK',
            BYE: 'BYE',
            CANCEL: 'CANCEL',
            INFO: 'INFO',
            INVITE: 'INVITE',
            MESSAGE: 'MESSAGE',
            NOTIFY: 'NOTIFY',
            OPTIONS: 'OPTIONS',
            REGISTER: 'REGISTER',
            REFER: 'REFER',
            UPDATE: 'UPDATE',
            SUBSCRIBE: 'SUBSCRIBE',
            DTMF_TRANSPORT: { INFO: 'INFO', RFC2833: 'RFC2833' },
            REASON_PHRASE: {
              100: 'Trying',
              180: 'Ringing',
              181: 'Call Is Being Forwarded',
              182: 'Queued',
              183: 'Session Progress',
              199: 'Early Dialog Terminated',
              200: 'OK',
              202: 'Accepted',
              204: 'No Notification',
              300: 'Multiple Choices',
              301: 'Moved Permanently',
              302: 'Moved Temporarily',
              305: 'Use Proxy',
              380: 'Alternative Service',
              400: 'Bad Request',
              401: 'Unauthorized',
              402: 'Payment Required',
              403: 'Forbidden',
              404: 'Not Found',
              405: 'Method Not Allowed',
              406: 'Not Acceptable',
              407: 'Proxy Authentication Required',
              408: 'Request Timeout',
              410: 'Gone',
              412: 'Conditional Request Failed',
              413: 'Request Entity Too Large',
              414: 'Request-URI Too Long',
              415: 'Unsupported Media Type',
              416: 'Unsupported URI Scheme',
              417: 'Unknown Resource-Priority',
              420: 'Bad Extension',
              421: 'Extension Required',
              422: 'Session Interval Too Small',
              423: 'Interval Too Brief',
              424: 'Bad Location Information',
              428: 'Use Identity Header',
              429: 'Provide Referrer Identity',
              430: 'Flow Failed',
              433: 'Anonymity Disallowed',
              436: 'Bad Identity-Info',
              437: 'Unsupported Certificate',
              438: 'Invalid Identity Header',
              439: 'First Hop Lacks Outbound Support',
              440: 'Max-Breadth Exceeded',
              469: 'Bad Info Package',
              470: 'Consent Needed',
              478: 'Unresolvable Destination',
              480: 'Temporarily Unavailable',
              481: 'Call/Transaction Does Not Exist',
              482: 'Loop Detected',
              483: 'Too Many Hops',
              484: 'Address Incomplete',
              485: 'Ambiguous',
              486: 'Busy Here',
              487: 'Request Terminated',
              488: 'Not Acceptable Here',
              489: 'Bad Event',
              491: 'Request Pending',
              493: 'Undecipherable',
              494: 'Security Agreement Required',
              500: 'JsSIP Internal Error',
              501: 'Not Implemented',
              502: 'Bad Gateway',
              503: 'Service Unavailable',
              504: 'Server Time-out',
              505: 'Version Not Supported',
              513: 'Message Too Large',
              580: 'Precondition Failure',
              600: 'Busy Everywhere',
              603: 'Decline',
              604: 'Does Not Exist Anywhere',
              606: 'Not Acceptable'
            },
            ALLOWED_METHODS:
              'INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO,NOTIFY',
            ACCEPTED_BODY_TYPES: 'application/sdp, application/dtmf-relay',
            MAX_FORWARDS: 69,
            SESSION_EXPIRES: 90,
            MIN_SESSION_EXPIRES: 60,
            CONNECTION_RECOVERY_MAX_INTERVAL: 30,
            CONNECTION_RECOVERY_MIN_INTERVAL: 2
          }
        },
        { '../package.json': 40 }
      ],
      3: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function s (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
          }
          var i = e('./Logger'),
            o = e('./SIPMessage'),
            l = e('./Constants'),
            u = e('./Transactions'),
            a = e('./Dialog/RequestSender'),
            c = e('./Utils'),
            h = new i('Dialog'),
            d = { STATUS_EARLY: 1, STATUS_CONFIRMED: 2 }
          t.exports = (function () {
            function e (t, n, r) {
              var s =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : d.STATUS_CONFIRMED
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e),
                (this._owner = t),
                (this._ua = t._ua),
                (this._uac_pending_reply = !1),
                (this._uas_pending_reply = !1),
                !n.hasHeader('contact'))
              )
                return {
                  error:
                    'unable to create a Dialog without Contact header field'
                }
              n instanceof o.IncomingResponse &&
                (s = n.status_code < 200 ? d.STATUS_EARLY : d.STATUS_CONFIRMED)
              var i = n.parseHeader('contact')
              'UAS' === r
                ? ((this._id = {
                    call_id: n.call_id,
                    local_tag: n.to_tag,
                    remote_tag: n.from_tag,
                    toString: function () {
                      return this.call_id + this.local_tag + this.remote_tag
                    }
                  }),
                  (this._state = s),
                  (this._remote_seqnum = n.cseq),
                  (this._local_uri = n.parseHeader('to').uri),
                  (this._remote_uri = n.parseHeader('from').uri),
                  (this._remote_target = i.uri),
                  (this._route_set = n.getHeaders('record-route')),
                  (this._ack_seqnum = this._remote_seqnum))
                : 'UAC' === r &&
                  ((this._id = {
                    call_id: n.call_id,
                    local_tag: n.from_tag,
                    remote_tag: n.to_tag,
                    toString: function () {
                      return this.call_id + this.local_tag + this.remote_tag
                    }
                  }),
                  (this._state = s),
                  (this._local_seqnum = n.cseq),
                  (this._local_uri = n.parseHeader('from').uri),
                  (this._remote_uri = n.parseHeader('to').uri),
                  (this._remote_target = i.uri),
                  (this._route_set = n.getHeaders('record-route').reverse()),
                  (this._ack_seqnum = null)),
                this._ua.newDialog(this),
                h.debug(
                  'new '
                    .concat(r, ' dialog created with status ')
                    .concat(
                      this._state === d.STATUS_EARLY ? 'EARLY' : 'CONFIRMED'
                    )
                )
            }
            return (
              s(e, null, [
                {
                  key: 'C',
                  get: function () {
                    return d
                  }
                }
              ]),
              s(e, [
                {
                  key: 'update',
                  value: function (e, t) {
                    ;(this._state = d.STATUS_CONFIRMED),
                      h.debug(
                        'dialog '.concat(
                          this._id.toString(),
                          '  changed to CONFIRMED state'
                        )
                      ),
                      'UAC' === t &&
                        (this._route_set = e
                          .getHeaders('record-route')
                          .reverse())
                  }
                },
                {
                  key: 'terminate',
                  value: function () {
                    h.debug('dialog '.concat(this._id.toString(), ' deleted')),
                      this._ua.destroyDialog(this)
                  }
                },
                {
                  key: 'sendRequest',
                  value: function (e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      r = c.cloneArray(n.extraHeaders),
                      s = c.cloneObject(n.eventHandlers),
                      i = n.body || null,
                      o = this._createRequest(e, r, i)
                    return (
                      (s.onAuthenticated = function () {
                        t._local_seqnum += 1
                      }),
                      new a(this, o, s).send(),
                      o
                    )
                  }
                },
                {
                  key: 'receiveRequest',
                  value: function (e) {
                    this._checkInDialogRequest(e) &&
                      (e.method === l.ACK && null !== this._ack_seqnum
                        ? (this._ack_seqnum = null)
                        : e.method === l.INVITE && (this._ack_seqnum = e.cseq),
                      this._owner.receiveRequest(e))
                  }
                },
                {
                  key: '_createRequest',
                  value: function (e, t, n) {
                    ;(t = c.cloneArray(t)),
                      this._local_seqnum ||
                        (this._local_seqnum = Math.floor(1e4 * Math.random()))
                    var r =
                      e === l.CANCEL || e === l.ACK
                        ? this._local_seqnum
                        : (this._local_seqnum += 1)
                    return new o.OutgoingRequest(
                      e,
                      this._remote_target,
                      this._ua,
                      {
                        cseq: r,
                        call_id: this._id.call_id,
                        from_uri: this._local_uri,
                        from_tag: this._id.local_tag,
                        to_uri: this._remote_uri,
                        to_tag: this._id.remote_tag,
                        route_set: this._route_set
                      },
                      t,
                      n
                    )
                  }
                },
                {
                  key: '_checkInDialogRequest',
                  value: function (e) {
                    var t = this
                    if (this._remote_seqnum)
                      if (e.cseq < this._remote_seqnum) {
                        if (e.method !== l.ACK) return e.reply(500), !1
                        if (
                          null === this._ack_seqnum ||
                          e.cseq !== this._ack_seqnum
                        )
                          return !1
                      } else
                        e.cseq > this._remote_seqnum &&
                          (this._remote_seqnum = e.cseq)
                    else this._remote_seqnum = e.cseq
                    if (
                      e.method === l.INVITE ||
                      (e.method === l.UPDATE && e.body)
                    ) {
                      if (!0 === this._uac_pending_reply) e.reply(491)
                      else {
                        if (!0 === this._uas_pending_reply) {
                          var n = 1 + ((10 * Math.random()) | 0)
                          return (
                            e.reply(500, null, ['Retry-After:'.concat(n)]), !1
                          )
                        }
                        this._uas_pending_reply = !0
                        e.server_transaction.on('stateChanged', function n () {
                          ;(e.server_transaction.state !==
                            u.C.STATUS_ACCEPTED &&
                            e.server_transaction.state !==
                              u.C.STATUS_COMPLETED &&
                            e.server_transaction.state !==
                              u.C.STATUS_TERMINATED) ||
                            (e.server_transaction.removeListener(
                              'stateChanged',
                              n
                            ),
                            (t._uas_pending_reply = !1))
                        })
                      }
                      e.hasHeader('contact') &&
                        e.server_transaction.on('stateChanged', function () {
                          e.server_transaction.state === u.C.STATUS_ACCEPTED &&
                            (t._remote_target = e.parseHeader('contact').uri)
                        })
                    } else
                      e.method === l.NOTIFY &&
                        e.hasHeader('contact') &&
                        e.server_transaction.on('stateChanged', function () {
                          e.server_transaction.state === u.C.STATUS_COMPLETED &&
                            (t._remote_target = e.parseHeader('contact').uri)
                        })
                    return !0
                  }
                },
                {
                  key: 'id',
                  get: function () {
                    return this._id
                  }
                },
                {
                  key: 'local_seqnum',
                  get: function () {
                    return this._local_seqnum
                  },
                  set: function (e) {
                    this._local_seqnum = e
                  }
                },
                {
                  key: 'owner',
                  get: function () {
                    return this._owner
                  }
                },
                {
                  key: 'uac_pending_reply',
                  get: function () {
                    return this._uac_pending_reply
                  },
                  set: function (e) {
                    this._uac_pending_reply = e
                  }
                },
                {
                  key: 'uas_pending_reply',
                  get: function () {
                    return this._uas_pending_reply
                  }
                }
              ]),
              e
            )
          })()
        },
        {
          './Constants': 2,
          './Dialog/RequestSender': 4,
          './Logger': 9,
          './SIPMessage': 21,
          './Transactions': 24,
          './Utils': 28
        }
      ],
      4: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('../Constants'),
            i = e('../Transactions'),
            o = e('../RTCSession'),
            l = e('../RequestSender'),
            u = {
              onRequestTimeout: function () {},
              onTransportError: function () {},
              onSuccessResponse: function () {},
              onErrorResponse: function () {},
              onAuthenticated: function () {},
              onDialogError: function () {}
            }
          t.exports = (function () {
            function e (t, n, r) {
              for (var s in ((function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
              (this._dialog = t),
              (this._ua = t._ua),
              (this._request = n),
              (this._eventHandlers = r),
              (this._reattempt = !1),
              (this._reattemptTimer = null),
              u))
                Object.prototype.hasOwnProperty.call(u, s) &&
                  (this._eventHandlers[s] || (this._eventHandlers[s] = u[s]))
            }
            var t, n, a
            return (
              (t = e),
              (n = [
                {
                  key: 'send',
                  value: function () {
                    var e = this,
                      t = new l(this._ua, this._request, {
                        onRequestTimeout: function () {
                          e._eventHandlers.onRequestTimeout()
                        },
                        onTransportError: function () {
                          e._eventHandlers.onTransportError()
                        },
                        onAuthenticated: function (t) {
                          e._eventHandlers.onAuthenticated(t)
                        },
                        onReceiveResponse: function (t) {
                          e._receiveResponse(t)
                        }
                      })
                    if (
                      (t.send(),
                      (this._request.method === s.INVITE ||
                        (this._request.method === s.UPDATE &&
                          this._request.body)) &&
                        t.clientTransaction.state !== i.C.STATUS_TERMINATED)
                    ) {
                      this._dialog.uac_pending_reply = !0
                      t.clientTransaction.on('stateChanged', function n () {
                        ;(t.clientTransaction.state !== i.C.STATUS_ACCEPTED &&
                          t.clientTransaction.state !== i.C.STATUS_COMPLETED &&
                          t.clientTransaction.state !==
                            i.C.STATUS_TERMINATED) ||
                          (t.clientTransaction.removeListener(
                            'stateChanged',
                            n
                          ),
                          (e._dialog.uac_pending_reply = !1))
                      })
                    }
                  }
                },
                {
                  key: '_receiveResponse',
                  value: function (e) {
                    var t = this
                    408 === e.status_code || 481 === e.status_code
                      ? this._eventHandlers.onDialogError(e)
                      : e.method === s.INVITE && 491 === e.status_code
                      ? this._reattempt
                        ? e.status_code >= 200 && e.status_code < 300
                          ? this._eventHandlers.onSuccessResponse(e)
                          : e.status_code >= 300 &&
                            this._eventHandlers.onErrorResponse(e)
                        : ((this._request.cseq = this._dialog.local_seqnum += 1),
                          (this._reattemptTimer = setTimeout(function () {
                            t._dialog.owner.status !== o.C.STATUS_TERMINATED &&
                              ((t._reattempt = !0), t._request_sender.send())
                          }, 1e3)))
                      : e.status_code >= 200 && e.status_code < 300
                      ? this._eventHandlers.onSuccessResponse(e)
                      : e.status_code >= 300 &&
                        this._eventHandlers.onErrorResponse(e)
                  }
                },
                {
                  key: 'request',
                  get: function () {
                    return this._request
                  }
                }
              ]) && r(t.prototype, n),
              a && r(t, a),
              e
            )
          })()
        },
        {
          '../Constants': 2,
          '../RTCSession': 14,
          '../RequestSender': 20,
          '../Transactions': 24
        }
      ],
      5: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('./Logger'),
            i = e('./Utils'),
            o = new s('DigestAuthentication')
          t.exports = (function () {
            function e (t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                (this._credentials = t),
                (this._cnonce = null),
                (this._nc = 0),
                (this._ncHex = '00000000'),
                (this._algorithm = null),
                (this._realm = null),
                (this._nonce = null),
                (this._opaque = null),
                (this._stale = null),
                (this._qop = null),
                (this._method = null),
                (this._uri = null),
                (this._ha1 = null),
                (this._response = null)
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'get',
                  value: function (e) {
                    switch (e) {
                      case 'realm':
                        return this._realm
                      case 'ha1':
                        return this._ha1
                      default:
                        return void o.warn(
                          'get() | cannot get "%s" parameter',
                          e
                        )
                    }
                  }
                },
                {
                  key: 'authenticate',
                  value: function (e, t) {
                    var n = e.method,
                      r = e.ruri,
                      s = e.body,
                      l =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : null
                    if (
                      ((this._algorithm = t.algorithm),
                      (this._realm = t.realm),
                      (this._nonce = t.nonce),
                      (this._opaque = t.opaque),
                      (this._stale = t.stale),
                      this._algorithm)
                    ) {
                      if ('MD5' !== this._algorithm)
                        return (
                          o.warn(
                            'authenticate() | challenge with Digest algorithm different than "MD5", authentication aborted'
                          ),
                          !1
                        )
                    } else this._algorithm = 'MD5'
                    if (!this._nonce)
                      return (
                        o.warn(
                          'authenticate() | challenge without Digest nonce, authentication aborted'
                        ),
                        !1
                      )
                    if (!this._realm)
                      return (
                        o.warn(
                          'authenticate() | challenge without Digest realm, authentication aborted'
                        ),
                        !1
                      )
                    if (!this._credentials.password) {
                      if (!this._credentials.ha1)
                        return (
                          o.warn(
                            'authenticate() | no plain SIP password nor ha1 provided, authentication aborted'
                          ),
                          !1
                        )
                      if (this._credentials.realm !== this._realm)
                        return (
                          o.warn(
                            'authenticate() | no plain SIP password, and stored `realm` does not match the given `realm`, cannot authenticate [stored:"%s", given:"%s"]',
                            this._credentials.realm,
                            this._realm
                          ),
                          !1
                        )
                    }
                    if (t.qop)
                      if (t.qop.indexOf('auth-int') > -1) this._qop = 'auth-int'
                      else {
                        if (!(t.qop.indexOf('auth') > -1))
                          return (
                            o.warn(
                              'authenticate() | challenge without Digest qop different than "auth" or "auth-int", authentication aborted'
                            ),
                            !1
                          )
                        this._qop = 'auth'
                      }
                    else this._qop = null
                    ;(this._method = n),
                      (this._uri = r),
                      (this._cnonce = l || i.createRandomToken(12)),
                      (this._nc += 1)
                    var u,
                      a,
                      c = Number(this._nc).toString(16)
                    return (
                      (this._ncHex = '00000000'.substr(0, 8 - c.length) + c),
                      4294967296 === this._nc &&
                        ((this._nc = 1), (this._ncHex = '00000001')),
                      this._credentials.password
                        ? (this._ha1 = i.calculateMD5(
                            ''
                              .concat(this._credentials.username, ':')
                              .concat(this._realm, ':')
                              .concat(this._credentials.password)
                          ))
                        : (this._ha1 = this._credentials.ha1),
                      'auth' === this._qop
                        ? ((u = ''.concat(this._method, ':').concat(this._uri)),
                          (a = i.calculateMD5(u)),
                          o.debug(
                            'authenticate() | using qop=auth [a2:"%s"]',
                            u
                          ),
                          (this._response = i.calculateMD5(
                            ''
                              .concat(this._ha1, ':')
                              .concat(this._nonce, ':')
                              .concat(this._ncHex, ':')
                              .concat(this._cnonce, ':auth:')
                              .concat(a)
                          )))
                        : 'auth-int' === this._qop
                        ? ((u = ''
                            .concat(this._method, ':')
                            .concat(this._uri, ':')
                            .concat(i.calculateMD5(s || ''))),
                          (a = i.calculateMD5(u)),
                          o.debug(
                            'authenticate() | using qop=auth-int [a2:"%s"]',
                            u
                          ),
                          (this._response = i.calculateMD5(
                            ''
                              .concat(this._ha1, ':')
                              .concat(this._nonce, ':')
                              .concat(this._ncHex, ':')
                              .concat(this._cnonce, ':auth-int:')
                              .concat(a)
                          )))
                        : null === this._qop &&
                          ((u = ''.concat(this._method, ':').concat(this._uri)),
                          (a = i.calculateMD5(u)),
                          o.debug(
                            'authenticate() | using qop=null [a2:"%s"]',
                            u
                          ),
                          (this._response = i.calculateMD5(
                            ''
                              .concat(this._ha1, ':')
                              .concat(this._nonce, ':')
                              .concat(a)
                          ))),
                      o.debug('authenticate() | response generated'),
                      !0
                    )
                  }
                },
                {
                  key: 'toString',
                  value: function () {
                    var e = []
                    if (!this._response)
                      throw new Error(
                        'response field does not exist, cannot generate Authorization header'
                      )
                    return (
                      e.push('algorithm='.concat(this._algorithm)),
                      e.push(
                        'username="'.concat(this._credentials.username, '"')
                      ),
                      e.push('realm="'.concat(this._realm, '"')),
                      e.push('nonce="'.concat(this._nonce, '"')),
                      e.push('uri="'.concat(this._uri, '"')),
                      e.push('response="'.concat(this._response, '"')),
                      this._opaque &&
                        e.push('opaque="'.concat(this._opaque, '"')),
                      this._qop &&
                        (e.push('qop='.concat(this._qop)),
                        e.push('cnonce="'.concat(this._cnonce, '"')),
                        e.push('nc='.concat(this._ncHex))),
                      'Digest '.concat(e.join(', '))
                    )
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        { './Logger': 9, './Utils': 28 }
      ],
      6: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function')
          }
          function i (e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && c(e, t)
          }
          function o (e) {
            var t = a()
            return function () {
              var n,
                s = h(e)
              if (t) {
                var i = h(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            var t = 'function' == typeof Map ? new Map() : void 0
            return (l = function (e) {
              if (
                null === e ||
                ((n = e),
                -1 === Function.toString.call(n).indexOf('[native code]'))
              )
                return e
              var n
              if ('function' != typeof e)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              if (void 0 !== t) {
                if (t.has(e)) return t.get(e)
                t.set(e, r)
              }
              function r () {
                return u(e, arguments, h(this).constructor)
              }
              return (
                (r.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                })),
                c(r, e)
              )
            })(e)
          }
          function u (e, t, n) {
            return (u = a()
              ? Reflect.construct
              : function (e, t, n) {
                  var r = [null]
                  r.push.apply(r, t)
                  var s = new (Function.bind.apply(e, r))()
                  return n && c(s, n.prototype), s
                }).apply(null, arguments)
          }
          function a () {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1
            if (Reflect.construct.sham) return !1
            if ('function' == typeof Proxy) return !0
            try {
              return (
                Date.prototype.toString.call(
                  Reflect.construct(Date, [], function () {})
                ),
                !0
              )
            } catch (e) {
              return !1
            }
          }
          function c (e, t) {
            return (c =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function h (e) {
            return (h = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var d = (function (e) {
              i(n, l(Error))
              var t = o(n)
              function n (e, r) {
                var i
                return (
                  s(this, n),
                  ((i = t.call(this)).code = 1),
                  (i.name = 'CONFIGURATION_ERROR'),
                  (i.parameter = e),
                  (i.value = r),
                  (i.message = i.value
                    ? 'Invalid value '
                        .concat(JSON.stringify(i.value), ' for parameter "')
                        .concat(i.parameter, '"')
                    : 'Missing parameter: '.concat(i.parameter)),
                  i
                )
              }
              return n
            })(),
            f = (function (e) {
              i(n, l(Error))
              var t = o(n)
              function n (e) {
                var r
                return (
                  s(this, n),
                  ((r = t.call(this)).code = 2),
                  (r.name = 'INVALID_STATE_ERROR'),
                  (r.status = e),
                  (r.message = 'Invalid status: '.concat(e)),
                  r
                )
              }
              return n
            })(),
            _ = (function (e) {
              i(n, l(Error))
              var t = o(n)
              function n (e) {
                var r
                return (
                  s(this, n),
                  ((r = t.call(this)).code = 3),
                  (r.name = 'NOT_SUPPORTED_ERROR'),
                  (r.message = e),
                  r
                )
              }
              return n
            })(),
            p = (function (e) {
              i(n, l(Error))
              var t = o(n)
              function n (e) {
                var r
                return (
                  s(this, n),
                  ((r = t.call(this)).code = 4),
                  (r.name = 'NOT_READY_ERROR'),
                  (r.message = e),
                  r
                )
              }
              return n
            })()
          t.exports = {
            ConfigurationError: d,
            InvalidStateError: f,
            NotSupportedError: _,
            NotReadyError: p
          }
        },
        {}
      ],
      7: [
        function (e, t, n) {
          'use strict'
          t.exports = (function () {
            function t (e) {
              return (
                '"' +
                e
                  .replace(/\\/g, '\\\\')
                  .replace(/"/g, '\\"')
                  .replace(/\x08/g, '\\b')
                  .replace(/\t/g, '\\t')
                  .replace(/\n/g, '\\n')
                  .replace(/\f/g, '\\f')
                  .replace(/\r/g, '\\r')
                  .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) +
                '"'
              )
            }
            var n = {
              parse: function (n, r) {
                var s = {
                  CRLF: c,
                  DIGIT: h,
                  ALPHA: d,
                  HEXDIG: f,
                  WSP: _,
                  OCTET: p,
                  DQUOTE: m,
                  SP: v,
                  HTAB: g,
                  alphanum: y,
                  reserved: T,
                  unreserved: C,
                  mark: b,
                  escaped: S,
                  LWS: E,
                  SWS: A,
                  HCOLON: R,
                  TEXT_UTF8_TRIM: w,
                  TEXT_UTF8char: I,
                  UTF8_NONASCII: O,
                  UTF8_CONT: k,
                  LHEX: function () {
                    var e
                    null === (e = h()) &&
                      (/^[a-f]/.test(n.charAt(i))
                        ? ((e = n.charAt(i)), i++)
                        : ((e = null), 0 === o && a('[a-f]')))
                    return e
                  },
                  token: N,
                  token_nodot: U,
                  separators: function () {
                    var e
                    40 === n.charCodeAt(i)
                      ? ((e = '('), i++)
                      : ((e = null), 0 === o && a('"("'))
                    null === e &&
                      (41 === n.charCodeAt(i)
                        ? ((e = ')'), i++)
                        : ((e = null), 0 === o && a('")"')),
                      null === e &&
                        (60 === n.charCodeAt(i)
                          ? ((e = '<'), i++)
                          : ((e = null), 0 === o && a('"<"')),
                        null === e &&
                          (62 === n.charCodeAt(i)
                            ? ((e = '>'), i++)
                            : ((e = null), 0 === o && a('">"')),
                          null === e &&
                            (64 === n.charCodeAt(i)
                              ? ((e = '@'), i++)
                              : ((e = null), 0 === o && a('"@"')),
                            null === e &&
                              (44 === n.charCodeAt(i)
                                ? ((e = ','), i++)
                                : ((e = null), 0 === o && a('","')),
                              null === e &&
                                (59 === n.charCodeAt(i)
                                  ? ((e = ';'), i++)
                                  : ((e = null), 0 === o && a('";"')),
                                null === e &&
                                  (58 === n.charCodeAt(i)
                                    ? ((e = ':'), i++)
                                    : ((e = null), 0 === o && a('":"')),
                                  null === e &&
                                    (92 === n.charCodeAt(i)
                                      ? ((e = '\\'), i++)
                                      : ((e = null), 0 === o && a('"\\\\"')),
                                    null === e &&
                                      null === (e = m()) &&
                                      (47 === n.charCodeAt(i)
                                        ? ((e = '/'), i++)
                                        : ((e = null), 0 === o && a('"/"')),
                                      null === e &&
                                        (91 === n.charCodeAt(i)
                                          ? ((e = '['), i++)
                                          : ((e = null), 0 === o && a('"["')),
                                        null === e &&
                                          (93 === n.charCodeAt(i)
                                            ? ((e = ']'), i++)
                                            : ((e = null), 0 === o && a('"]"')),
                                          null === e &&
                                            (63 === n.charCodeAt(i)
                                              ? ((e = '?'), i++)
                                              : ((e = null),
                                                0 === o && a('"?"')),
                                            null === e &&
                                              (61 === n.charCodeAt(i)
                                                ? ((e = '='), i++)
                                                : ((e = null),
                                                  0 === o && a('"="')),
                                              null === e &&
                                                (123 === n.charCodeAt(i)
                                                  ? ((e = '{'), i++)
                                                  : ((e = null),
                                                    0 === o && a('"{"')),
                                                null === e &&
                                                  (125 === n.charCodeAt(i)
                                                    ? ((e = '}'), i++)
                                                    : ((e = null),
                                                      0 === o && a('"}"')),
                                                  null === e &&
                                                    null === (e = v()) &&
                                                    (e = g()))))))))))))))))
                    return e
                  },
                  word: D,
                  STAR: x,
                  SLASH: P,
                  EQUAL: M,
                  LPAREN: q,
                  RPAREN: L,
                  RAQUOT: H,
                  LAQUOT: F,
                  COMMA: j,
                  SEMI: G,
                  COLON: W,
                  LDQUOT: V,
                  RDQUOT: B,
                  comment: function e () {
                    var t, n, r
                    var s
                    s = i
                    t = q()
                    if (null !== t) {
                      for (
                        n = [],
                          null === (r = K()) && null === (r = X()) && (r = e());
                        null !== r;

                      )
                        n.push(r),
                          null === (r = K()) && null === (r = X()) && (r = e())
                      null !== n && null !== (r = L())
                        ? (t = [t, n, r])
                        : ((t = null), (i = s))
                    } else (t = null), (i = s)
                    return t
                  },
                  ctext: K,
                  quoted_string: z,
                  quoted_string_clean: Y,
                  qdtext: $,
                  quoted_pair: X,
                  SIP_URI_noparams: J,
                  SIP_URI: Q,
                  uri_scheme: Z,
                  uri_scheme_sips: ee,
                  uri_scheme_sip: te,
                  userinfo: ne,
                  user: re,
                  user_unreserved: se,
                  password: ie,
                  hostport: oe,
                  host: le,
                  hostname: ue,
                  domainlabel: ae,
                  toplabel: ce,
                  IPv6reference: he,
                  IPv6address: de,
                  h16: fe,
                  ls32: _e,
                  IPv4address: pe,
                  dec_octet: me,
                  port: ve,
                  uri_parameters: ge,
                  uri_parameter: ye,
                  transport_param: Te,
                  user_param: Ce,
                  method_param: be,
                  ttl_param: Se,
                  maddr_param: Ee,
                  lr_param: Ae,
                  other_param: Re,
                  pname: we,
                  pvalue: Ie,
                  paramchar: Oe,
                  param_unreserved: ke,
                  headers: Ne,
                  header: Ue,
                  hname: De,
                  hvalue: xe,
                  hnv_unreserved: Pe,
                  Request_Response: function () {
                    var e
                    null === (e = ht()) && (e = Me())
                    return e
                  },
                  Request_Line: Me,
                  Request_URI: qe,
                  absoluteURI: Le,
                  hier_part: He,
                  net_path: Fe,
                  abs_path: je,
                  opaque_part: Ge,
                  uric: We,
                  uric_no_slash: Ve,
                  path_segments: Be,
                  segment: Ke,
                  param: ze,
                  pchar: Ye,
                  scheme: $e,
                  authority: Xe,
                  srvr: Je,
                  reg_name: Qe,
                  query: Ze,
                  SIP_Version: et,
                  INVITEm: tt,
                  ACKm: nt,
                  OPTIONSm: rt,
                  BYEm: st,
                  CANCELm: it,
                  REGISTERm: ot,
                  SUBSCRIBEm: lt,
                  NOTIFYm: ut,
                  REFERm: at,
                  Method: ct,
                  Status_Line: ht,
                  Status_Code: dt,
                  extension_code: ft,
                  Reason_Phrase: _t,
                  Allow_Events: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = Lt()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = Lt())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = Lt())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  Call_ID: function () {
                    var e, t, r, s, l, u
                    ;(s = i),
                      (l = i),
                      null !== (e = D())
                        ? ((u = i),
                          64 === n.charCodeAt(i)
                            ? ((t = '@'), i++)
                            : ((t = null), 0 === o && a('"@"')),
                          null !== t && null !== (r = D())
                            ? (t = [t, r])
                            : ((t = null), (i = u)),
                          null !== (t = null !== t ? t : '')
                            ? (e = [e, t])
                            : ((e = null), (i = l)))
                        : ((e = null), (i = l))
                    null !== e && ((c = s), (e = void (jn = n.substring(i, c))))
                    var c
                    null === e && (i = s)
                    return e
                  },
                  Contact: function () {
                    var e, t, n, r, s, o, l
                    if (((s = i), null === (e = x())))
                      if (((o = i), null !== (e = pt()))) {
                        for (
                          t = [],
                            l = i,
                            null !== (n = j()) && null !== (r = pt())
                              ? (n = [n, r])
                              : ((n = null), (i = l));
                          null !== n;

                        )
                          t.push(n),
                            (l = i),
                            null !== (n = j()) && null !== (r = pt())
                              ? (n = [n, r])
                              : ((n = null), (i = l))
                        null !== t ? (e = [e, t]) : ((e = null), (i = o))
                      } else (e = null), (i = o)
                    null !== e &&
                      (e = (function (e) {
                        var t, n
                        for (n = jn.multi_header.length, t = 0; t < n; t++)
                          if (null === jn.multi_header[t].parsed) {
                            jn = null
                            break
                          }
                        jn = null !== jn ? jn.multi_header : -1
                      })())
                    null === e && (i = s)
                    return e
                  },
                  contact_param: pt,
                  name_addr: mt,
                  display_name: vt,
                  contact_params: gt,
                  c_p_q: yt,
                  c_p_expires: Tt,
                  delta_seconds: Ct,
                  qvalue: bt,
                  generic_param: St,
                  gen_value: Et,
                  Content_Disposition: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = At()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = G()) && null !== (r = Rt())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = G()) && null !== (r = Rt())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  disp_type: At,
                  disp_param: Rt,
                  handling_param: wt,
                  Content_Encoding: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = N()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  Content_Length: function () {
                    var e, t, n
                    if (((n = i), null !== (t = h())))
                      for (e = []; null !== t; ) e.push(t), (t = h())
                    else e = null
                    null !== e && (e = void (jn = parseInt(e.join(''))))
                    null === e && (i = n)
                    return e
                  },
                  Content_Type: function () {
                    var e, t
                    ;(t = i),
                      null !== (e = It()) &&
                        ((r = t), (e = void (jn = n.substring(i, r))))
                    var r
                    null === e && (i = t)
                    return e
                  },
                  media_type: It,
                  m_type: Ot,
                  discrete_type: kt,
                  composite_type: Nt,
                  extension_token: Ut,
                  x_token: Dt,
                  m_subtype: xt,
                  m_parameter: Pt,
                  m_value: Mt,
                  CSeq: function () {
                    var e, t, n, r
                    ;(r = i),
                      null !== (e = qt()) &&
                      null !== (t = E()) &&
                      null !== (n = ct())
                        ? (e = [e, t, n])
                        : ((e = null), (i = r))
                    return e
                  },
                  CSeq_value: qt,
                  Expires: function () {
                    var e, t
                    ;(t = i), null !== (e = Ct()) && (e = void (jn = e))
                    null === e && (i = t)
                    return e
                  },
                  Event: function () {
                    var e, t, n, r, s, o, l
                    if (((s = i), (o = i), null !== (e = Lt()))) {
                      for (
                        t = [],
                          l = i,
                          null !== (n = G()) && null !== (r = St())
                            ? (n = [n, r])
                            : ((n = null), (i = l));
                        null !== n;

                      )
                        t.push(n),
                          (l = i),
                          null !== (n = G()) && null !== (r = St())
                            ? (n = [n, r])
                            : ((n = null), (i = l))
                      null !== t ? (e = [e, t]) : ((e = null), (i = o))
                    } else (e = null), (i = o)
                    null !== e &&
                      ((u = e[0]),
                      (e = void (jn.event = u.join('').toLowerCase())))
                    var u
                    null === e && (i = s)
                    return e
                  },
                  event_type: Lt,
                  From: function () {
                    var e, t, n, r, s, o, l
                    ;(s = i), (o = i), null === (e = J()) && (e = mt())
                    if (null !== e) {
                      for (
                        t = [],
                          l = i,
                          null !== (n = G()) && null !== (r = Ht())
                            ? (n = [n, r])
                            : ((n = null), (i = l));
                        null !== n;

                      )
                        t.push(n),
                          (l = i),
                          null !== (n = G()) && null !== (r = Ht())
                            ? (n = [n, r])
                            : ((n = null), (i = l))
                      null !== t ? (e = [e, t]) : ((e = null), (i = o))
                    } else (e = null), (i = o)
                    null !== e &&
                      (e = (function (e) {
                        var t = jn.tag
                        try {
                          ;(jn = new Fn(jn.uri, jn.display_name, jn.params)),
                            t && jn.setParam('tag', t)
                        } catch (e) {
                          jn = -1
                        }
                      })())
                    null === e && (i = s)
                    return e
                  },
                  from_param: Ht,
                  tag_param: Ft,
                  Max_Forwards: function () {
                    var e, t, n
                    if (((n = i), null !== (t = h())))
                      for (e = []; null !== t; ) e.push(t), (t = h())
                    else e = null
                    null !== e && (e = void (jn = parseInt(e.join(''))))
                    null === e && (i = n)
                    return e
                  },
                  Min_Expires: function () {
                    var e, t
                    ;(t = i), null !== (e = Ct()) && (e = void (jn = e))
                    null === e && (i = t)
                    return e
                  },
                  Name_Addr_Header: function () {
                    var e, t, n, r, s, o, l, u, a, c
                    ;(u = i), (a = i), (e = []), (t = vt())
                    for (; null !== t; ) e.push(t), (t = vt())
                    if (null !== e)
                      if (null !== (t = F()))
                        if (null !== (n = Q()))
                          if (null !== (r = H())) {
                            for (
                              s = [],
                                c = i,
                                null !== (o = G()) && null !== (l = St())
                                  ? (o = [o, l])
                                  : ((o = null), (i = c));
                              null !== o;

                            )
                              s.push(o),
                                (c = i),
                                null !== (o = G()) && null !== (l = St())
                                  ? (o = [o, l])
                                  : ((o = null), (i = c))
                            null !== s
                              ? (e = [e, t, n, r, s])
                              : ((e = null), (i = a))
                          } else (e = null), (i = a)
                        else (e = null), (i = a)
                      else (e = null), (i = a)
                    else (e = null), (i = a)
                    null !== e &&
                      (e = (function (e) {
                        try {
                          jn = new Fn(jn.uri, jn.display_name, jn.params)
                        } catch (e) {
                          jn = -1
                        }
                      })())
                    null === e && (i = u)
                    return e
                  },
                  Proxy_Authenticate: function () {
                    return jt()
                  },
                  challenge: jt,
                  other_challenge: Gt,
                  auth_param: Wt,
                  digest_cln: Vt,
                  realm: Bt,
                  realm_value: Kt,
                  domain: zt,
                  URI: Yt,
                  nonce: $t,
                  nonce_value: Xt,
                  opaque: Jt,
                  stale: Qt,
                  algorithm: Zt,
                  qop_options: en,
                  qop_value: tn,
                  Proxy_Require: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = N()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  Record_Route: function () {
                    var e, t, n, r, s, o, l
                    if (((s = i), (o = i), null !== (e = nn()))) {
                      for (
                        t = [],
                          l = i,
                          null !== (n = j()) && null !== (r = nn())
                            ? (n = [n, r])
                            : ((n = null), (i = l));
                        null !== n;

                      )
                        t.push(n),
                          (l = i),
                          null !== (n = j()) && null !== (r = nn())
                            ? (n = [n, r])
                            : ((n = null), (i = l))
                      null !== t ? (e = [e, t]) : ((e = null), (i = o))
                    } else (e = null), (i = o)
                    null !== e &&
                      (e = (function (e) {
                        var t, n
                        for (n = jn.multi_header.length, t = 0; t < n; t++)
                          if (null === jn.multi_header[t].parsed) {
                            jn = null
                            break
                          }
                        jn = null !== jn ? jn.multi_header : -1
                      })())
                    null === e && (i = s)
                    return e
                  },
                  rec_route: nn,
                  Reason: function () {
                    var e, t, r, s, l, u, c
                    ;(l = i),
                      (u = i),
                      'sip' === n.substr(i, 3).toLowerCase()
                        ? ((e = n.substr(i, 3)), (i += 3))
                        : ((e = null), 0 === o && a('"SIP"'))
                    null === e && (e = N())
                    if (null !== e) {
                      for (
                        t = [],
                          c = i,
                          null !== (r = G()) && null !== (s = rn())
                            ? (r = [r, s])
                            : ((r = null), (i = c));
                        null !== r;

                      )
                        t.push(r),
                          (c = i),
                          null !== (r = G()) && null !== (s = rn())
                            ? (r = [r, s])
                            : ((r = null), (i = c))
                      null !== t ? (e = [e, t]) : ((e = null), (i = u))
                    } else (e = null), (i = u)
                    null !== e &&
                      (e = (function (e, t) {
                        if (
                          ((jn.protocol = t.toLowerCase()),
                          jn.params || (jn.params = {}),
                          jn.params.text && '"' === jn.params.text[0])
                        ) {
                          var n = jn.params.text
                          ;(jn.text = n.substring(1, n.length - 1)),
                            delete jn.params.text
                        }
                      })(0, e[0]))
                    null === e && (i = l)
                    return e
                  },
                  reason_param: rn,
                  reason_cause: sn,
                  Require: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = N()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  Route: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = on()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = on())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = on())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  route_param: on,
                  Subscription_State: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = ln()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = G()) && null !== (r = un())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = G()) && null !== (r = un())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  substate_value: ln,
                  subexp_params: un,
                  event_reason_value: an,
                  Subject: function () {
                    var e
                    return (e = null !== (e = w()) ? e : '')
                  },
                  Supported: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = N()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = N())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return (e = null !== e ? e : '')
                  },
                  To: function () {
                    var e, t, n, r, s, o, l
                    ;(s = i), (o = i), null === (e = J()) && (e = mt())
                    if (null !== e) {
                      for (
                        t = [],
                          l = i,
                          null !== (n = G()) && null !== (r = cn())
                            ? (n = [n, r])
                            : ((n = null), (i = l));
                        null !== n;

                      )
                        t.push(n),
                          (l = i),
                          null !== (n = G()) && null !== (r = cn())
                            ? (n = [n, r])
                            : ((n = null), (i = l))
                      null !== t ? (e = [e, t]) : ((e = null), (i = o))
                    } else (e = null), (i = o)
                    null !== e &&
                      (e = (function (e) {
                        var t = jn.tag
                        try {
                          ;(jn = new Fn(jn.uri, jn.display_name, jn.params)),
                            t && jn.setParam('tag', t)
                        } catch (e) {
                          jn = -1
                        }
                      })())
                    null === e && (i = s)
                    return e
                  },
                  to_param: cn,
                  Via: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = hn()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = j()) && null !== (r = hn())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = j()) && null !== (r = hn())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  via_param: hn,
                  via_params: dn,
                  via_ttl: fn,
                  via_maddr: _n,
                  via_received: pn,
                  via_branch: mn,
                  response_port: vn,
                  rport: gn,
                  sent_protocol: yn,
                  protocol_name: Tn,
                  transport: Cn,
                  sent_by: bn,
                  via_host: Sn,
                  via_port: En,
                  ttl: An,
                  WWW_Authenticate: function () {
                    return jt()
                  },
                  Session_Expires: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = Rn()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = G()) && null !== (r = wn())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = G()) && null !== (r = wn())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  s_e_expires: Rn,
                  s_e_params: wn,
                  s_e_refresher: In,
                  extension_header: function () {
                    var e, t, n, r
                    ;(r = i),
                      null !== (e = N()) &&
                      null !== (t = R()) &&
                      null !== (n = On())
                        ? (e = [e, t, n])
                        : ((e = null), (i = r))
                    return e
                  },
                  header_value: On,
                  message_body: function () {
                    var e, t
                    ;(e = []), (t = p())
                    for (; null !== t; ) e.push(t), (t = p())
                    return e
                  },
                  uuid_URI: function () {
                    var e, t, r
                    ;(r = i),
                      'uuid:' === n.substr(i, 5)
                        ? ((e = 'uuid:'), (i += 5))
                        : ((e = null), 0 === o && a('"uuid:"'))
                    null !== e && null !== (t = kn())
                      ? (e = [e, t])
                      : ((e = null), (i = r))
                    return e
                  },
                  uuid: kn,
                  hex4: Nn,
                  hex8: Un,
                  hex12: Dn,
                  Refer_To: function () {
                    var e, t, n, r, s, o, l
                    ;(s = i), (o = i), null === (e = J()) && (e = mt())
                    if (null !== e) {
                      for (
                        t = [],
                          l = i,
                          null !== (n = G()) && null !== (r = St())
                            ? (n = [n, r])
                            : ((n = null), (i = l));
                        null !== n;

                      )
                        t.push(n),
                          (l = i),
                          null !== (n = G()) && null !== (r = St())
                            ? (n = [n, r])
                            : ((n = null), (i = l))
                      null !== t ? (e = [e, t]) : ((e = null), (i = o))
                    } else (e = null), (i = o)
                    null !== e &&
                      (e = (function (e) {
                        try {
                          jn = new Fn(jn.uri, jn.display_name, jn.params)
                        } catch (e) {
                          jn = -1
                        }
                      })())
                    null === e && (i = s)
                    return e
                  },
                  Replaces: function () {
                    var e, t, n, r, s, o
                    if (((s = i), null !== (e = xn()))) {
                      for (
                        t = [],
                          o = i,
                          null !== (n = G()) && null !== (r = Pn())
                            ? (n = [n, r])
                            : ((n = null), (i = o));
                        null !== n;

                      )
                        t.push(n),
                          (o = i),
                          null !== (n = G()) && null !== (r = Pn())
                            ? (n = [n, r])
                            : ((n = null), (i = o))
                      null !== t ? (e = [e, t]) : ((e = null), (i = s))
                    } else (e = null), (i = s)
                    return e
                  },
                  call_id: xn,
                  replaces_param: Pn,
                  to_tag: Mn,
                  from_tag: qn,
                  early_flag: Ln
                }
                if (void 0 !== r) {
                  if (void 0 === s[r])
                    throw new Error('Invalid rule name: ' + t(r) + '.')
                } else r = 'CRLF'
                var i = 0,
                  o = 0,
                  l = 0,
                  u = []
                function a (e) {
                  i < l || (i > l && ((l = i), (u = [])), u.push(e))
                }
                function c () {
                  var e
                  return (
                    '\r\n' === n.substr(i, 2)
                      ? ((e = '\r\n'), (i += 2))
                      : ((e = null), 0 === o && a('"\\r\\n"')),
                    e
                  )
                }
                function h () {
                  var e
                  return (
                    /^[0-9]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[0-9]')),
                    e
                  )
                }
                function d () {
                  var e
                  return (
                    /^[a-zA-Z]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[a-zA-Z]')),
                    e
                  )
                }
                function f () {
                  var e
                  return (
                    /^[0-9a-fA-F]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[0-9a-fA-F]')),
                    e
                  )
                }
                function _ () {
                  var e
                  return null === (e = v()) && (e = g()), e
                }
                function p () {
                  var e
                  return (
                    /^[\0-\xFF]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[\\0-\\xFF]')),
                    e
                  )
                }
                function m () {
                  var e
                  return (
                    /^["]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('["]')),
                    e
                  )
                }
                function v () {
                  var e
                  return (
                    32 === n.charCodeAt(i)
                      ? ((e = ' '), i++)
                      : ((e = null), 0 === o && a('" "')),
                    e
                  )
                }
                function g () {
                  var e
                  return (
                    9 === n.charCodeAt(i)
                      ? ((e = '\t'), i++)
                      : ((e = null), 0 === o && a('"\\t"')),
                    e
                  )
                }
                function y () {
                  var e
                  return (
                    /^[a-zA-Z0-9]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[a-zA-Z0-9]')),
                    e
                  )
                }
                function T () {
                  var e
                  return (
                    59 === n.charCodeAt(i)
                      ? ((e = ';'), i++)
                      : ((e = null), 0 === o && a('";"')),
                    null === e &&
                      (47 === n.charCodeAt(i)
                        ? ((e = '/'), i++)
                        : ((e = null), 0 === o && a('"/"')),
                      null === e &&
                        (63 === n.charCodeAt(i)
                          ? ((e = '?'), i++)
                          : ((e = null), 0 === o && a('"?"')),
                        null === e &&
                          (58 === n.charCodeAt(i)
                            ? ((e = ':'), i++)
                            : ((e = null), 0 === o && a('":"')),
                          null === e &&
                            (64 === n.charCodeAt(i)
                              ? ((e = '@'), i++)
                              : ((e = null), 0 === o && a('"@"')),
                            null === e &&
                              (38 === n.charCodeAt(i)
                                ? ((e = '&'), i++)
                                : ((e = null), 0 === o && a('"&"')),
                              null === e &&
                                (61 === n.charCodeAt(i)
                                  ? ((e = '='), i++)
                                  : ((e = null), 0 === o && a('"="')),
                                null === e &&
                                  (43 === n.charCodeAt(i)
                                    ? ((e = '+'), i++)
                                    : ((e = null), 0 === o && a('"+"')),
                                  null === e &&
                                    (36 === n.charCodeAt(i)
                                      ? ((e = '$'), i++)
                                      : ((e = null), 0 === o && a('"$"')),
                                    null === e &&
                                      (44 === n.charCodeAt(i)
                                        ? ((e = ','), i++)
                                        : ((e = null),
                                          0 === o && a('","'))))))))))),
                    e
                  )
                }
                function C () {
                  var e
                  return null === (e = y()) && (e = b()), e
                }
                function b () {
                  var e
                  return (
                    45 === n.charCodeAt(i)
                      ? ((e = '-'), i++)
                      : ((e = null), 0 === o && a('"-"')),
                    null === e &&
                      (95 === n.charCodeAt(i)
                        ? ((e = '_'), i++)
                        : ((e = null), 0 === o && a('"_"')),
                      null === e &&
                        (46 === n.charCodeAt(i)
                          ? ((e = '.'), i++)
                          : ((e = null), 0 === o && a('"."')),
                        null === e &&
                          (33 === n.charCodeAt(i)
                            ? ((e = '!'), i++)
                            : ((e = null), 0 === o && a('"!"')),
                          null === e &&
                            (126 === n.charCodeAt(i)
                              ? ((e = '~'), i++)
                              : ((e = null), 0 === o && a('"~"')),
                            null === e &&
                              (42 === n.charCodeAt(i)
                                ? ((e = '*'), i++)
                                : ((e = null), 0 === o && a('"*"')),
                              null === e &&
                                (39 === n.charCodeAt(i)
                                  ? ((e = "'"), i++)
                                  : ((e = null), 0 === o && a('"\'"')),
                                null === e &&
                                  (40 === n.charCodeAt(i)
                                    ? ((e = '('), i++)
                                    : ((e = null), 0 === o && a('"("')),
                                  null === e &&
                                    (41 === n.charCodeAt(i)
                                      ? ((e = ')'), i++)
                                      : ((e = null),
                                        0 === o && a('")"')))))))))),
                    e
                  )
                }
                function S () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    37 === n.charCodeAt(i)
                      ? ((e = '%'), i++)
                      : ((e = null), 0 === o && a('"%"')),
                    null !== e && null !== (t = f()) && null !== (r = f())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && (e = e.join('')),
                    null === e && (i = s),
                    e
                  )
                }
                function E () {
                  var e, t, n, r, s, o
                  for (r = i, s = i, o = i, e = [], t = _(); null !== t; )
                    e.push(t), (t = _())
                  if (
                    (null !== e && null !== (t = c())
                      ? (e = [e, t])
                      : ((e = null), (i = o)),
                    null !== (e = null !== e ? e : ''))
                  ) {
                    if (null !== (n = _()))
                      for (t = []; null !== n; ) t.push(n), (n = _())
                    else t = null
                    null !== t ? (e = [e, t]) : ((e = null), (i = s))
                  } else (e = null), (i = s)
                  return null !== e && (e = ' '), null === e && (i = r), e
                }
                function A () {
                  var e
                  return (e = null !== (e = E()) ? e : '')
                }
                function R () {
                  var e, t, r, s, l
                  for (
                    s = i, l = i, e = [], null === (t = v()) && (t = g());
                    null !== t;

                  )
                    e.push(t), null === (t = v()) && (t = g())
                  return (
                    null !== e
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = ':'),
                    null === e && (i = s),
                    e
                  )
                }
                function w () {
                  var e, t, r, s, o, l, u, a
                  if (((o = i), (l = i), null !== (t = I())))
                    for (e = []; null !== t; ) e.push(t), (t = I())
                  else e = null
                  if (null !== e) {
                    for (t = [], u = i, r = [], s = E(); null !== s; )
                      r.push(s), (s = E())
                    for (
                      null !== r && null !== (s = I())
                        ? (r = [r, s])
                        : ((r = null), (i = u));
                      null !== r;

                    ) {
                      for (t.push(r), u = i, r = [], s = E(); null !== s; )
                        r.push(s), (s = E())
                      null !== r && null !== (s = I())
                        ? (r = [r, s])
                        : ((r = null), (i = u))
                    }
                    null !== t ? (e = [e, t]) : ((e = null), (i = l))
                  } else (e = null), (i = l)
                  return (
                    null !== e && ((a = o), (e = n.substring(i, a))),
                    null === e && (i = o),
                    e
                  )
                }
                function I () {
                  var e
                  return (
                    /^[!-~]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[!-~]')),
                    null === e && (e = O()),
                    e
                  )
                }
                function O () {
                  var e
                  return (
                    /^[\x80-\uFFFF]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[\\x80-\\uFFFF]')),
                    e
                  )
                }
                function k () {
                  var e
                  return (
                    /^[\x80-\xBF]/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a('[\\x80-\\xBF]')),
                    e
                  )
                }
                function N () {
                  var e, t, r, s
                  if (
                    ((r = i),
                    null === (t = y()) &&
                      (45 === n.charCodeAt(i)
                        ? ((t = '-'), i++)
                        : ((t = null), 0 === o && a('"-"')),
                      null === t &&
                        (46 === n.charCodeAt(i)
                          ? ((t = '.'), i++)
                          : ((t = null), 0 === o && a('"."')),
                        null === t &&
                          (33 === n.charCodeAt(i)
                            ? ((t = '!'), i++)
                            : ((t = null), 0 === o && a('"!"')),
                          null === t &&
                            (37 === n.charCodeAt(i)
                              ? ((t = '%'), i++)
                              : ((t = null), 0 === o && a('"%"')),
                            null === t &&
                              (42 === n.charCodeAt(i)
                                ? ((t = '*'), i++)
                                : ((t = null), 0 === o && a('"*"')),
                              null === t &&
                                (95 === n.charCodeAt(i)
                                  ? ((t = '_'), i++)
                                  : ((t = null), 0 === o && a('"_"')),
                                null === t &&
                                  (43 === n.charCodeAt(i)
                                    ? ((t = '+'), i++)
                                    : ((t = null), 0 === o && a('"+"')),
                                  null === t &&
                                    (96 === n.charCodeAt(i)
                                      ? ((t = '`'), i++)
                                      : ((t = null), 0 === o && a('"`"')),
                                    null === t &&
                                      (39 === n.charCodeAt(i)
                                        ? ((t = "'"), i++)
                                        : ((t = null), 0 === o && a('"\'"')),
                                      null === t &&
                                        (126 === n.charCodeAt(i)
                                          ? ((t = '~'), i++)
                                          : ((t = null),
                                            0 === o && a('"~"')))))))))))),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((t = '-'), i++)
                            : ((t = null), 0 === o && a('"-"')),
                          null === t &&
                            (46 === n.charCodeAt(i)
                              ? ((t = '.'), i++)
                              : ((t = null), 0 === o && a('"."')),
                            null === t &&
                              (33 === n.charCodeAt(i)
                                ? ((t = '!'), i++)
                                : ((t = null), 0 === o && a('"!"')),
                              null === t &&
                                (37 === n.charCodeAt(i)
                                  ? ((t = '%'), i++)
                                  : ((t = null), 0 === o && a('"%"')),
                                null === t &&
                                  (42 === n.charCodeAt(i)
                                    ? ((t = '*'), i++)
                                    : ((t = null), 0 === o && a('"*"')),
                                  null === t &&
                                    (95 === n.charCodeAt(i)
                                      ? ((t = '_'), i++)
                                      : ((t = null), 0 === o && a('"_"')),
                                    null === t &&
                                      (43 === n.charCodeAt(i)
                                        ? ((t = '+'), i++)
                                        : ((t = null), 0 === o && a('"+"')),
                                      null === t &&
                                        (96 === n.charCodeAt(i)
                                          ? ((t = '`'), i++)
                                          : ((t = null), 0 === o && a('"`"')),
                                        null === t &&
                                          (39 === n.charCodeAt(i)
                                            ? ((t = "'"), i++)
                                            : ((t = null),
                                              0 === o && a('"\'"')),
                                          null === t &&
                                            (126 === n.charCodeAt(i)
                                              ? ((t = '~'), i++)
                                              : ((t = null),
                                                0 === o && a('"~"'))))))))))))
                  else e = null
                  return (
                    null !== e && ((s = r), (e = n.substring(i, s))),
                    null === e && (i = r),
                    e
                  )
                }
                function U () {
                  var e, t, r, s
                  if (
                    ((r = i),
                    null === (t = y()) &&
                      (45 === n.charCodeAt(i)
                        ? ((t = '-'), i++)
                        : ((t = null), 0 === o && a('"-"')),
                      null === t &&
                        (33 === n.charCodeAt(i)
                          ? ((t = '!'), i++)
                          : ((t = null), 0 === o && a('"!"')),
                        null === t &&
                          (37 === n.charCodeAt(i)
                            ? ((t = '%'), i++)
                            : ((t = null), 0 === o && a('"%"')),
                          null === t &&
                            (42 === n.charCodeAt(i)
                              ? ((t = '*'), i++)
                              : ((t = null), 0 === o && a('"*"')),
                            null === t &&
                              (95 === n.charCodeAt(i)
                                ? ((t = '_'), i++)
                                : ((t = null), 0 === o && a('"_"')),
                              null === t &&
                                (43 === n.charCodeAt(i)
                                  ? ((t = '+'), i++)
                                  : ((t = null), 0 === o && a('"+"')),
                                null === t &&
                                  (96 === n.charCodeAt(i)
                                    ? ((t = '`'), i++)
                                    : ((t = null), 0 === o && a('"`"')),
                                  null === t &&
                                    (39 === n.charCodeAt(i)
                                      ? ((t = "'"), i++)
                                      : ((t = null), 0 === o && a('"\'"')),
                                    null === t &&
                                      (126 === n.charCodeAt(i)
                                        ? ((t = '~'), i++)
                                        : ((t = null),
                                          0 === o && a('"~"'))))))))))),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((t = '-'), i++)
                            : ((t = null), 0 === o && a('"-"')),
                          null === t &&
                            (33 === n.charCodeAt(i)
                              ? ((t = '!'), i++)
                              : ((t = null), 0 === o && a('"!"')),
                            null === t &&
                              (37 === n.charCodeAt(i)
                                ? ((t = '%'), i++)
                                : ((t = null), 0 === o && a('"%"')),
                              null === t &&
                                (42 === n.charCodeAt(i)
                                  ? ((t = '*'), i++)
                                  : ((t = null), 0 === o && a('"*"')),
                                null === t &&
                                  (95 === n.charCodeAt(i)
                                    ? ((t = '_'), i++)
                                    : ((t = null), 0 === o && a('"_"')),
                                  null === t &&
                                    (43 === n.charCodeAt(i)
                                      ? ((t = '+'), i++)
                                      : ((t = null), 0 === o && a('"+"')),
                                    null === t &&
                                      (96 === n.charCodeAt(i)
                                        ? ((t = '`'), i++)
                                        : ((t = null), 0 === o && a('"`"')),
                                      null === t &&
                                        (39 === n.charCodeAt(i)
                                          ? ((t = "'"), i++)
                                          : ((t = null), 0 === o && a('"\'"')),
                                        null === t &&
                                          (126 === n.charCodeAt(i)
                                            ? ((t = '~'), i++)
                                            : ((t = null),
                                              0 === o && a('"~"')))))))))))
                  else e = null
                  return (
                    null !== e && ((s = r), (e = n.substring(i, s))),
                    null === e && (i = r),
                    e
                  )
                }
                function D () {
                  var e, t, r, s
                  if (
                    ((r = i),
                    null === (t = y()) &&
                      (45 === n.charCodeAt(i)
                        ? ((t = '-'), i++)
                        : ((t = null), 0 === o && a('"-"')),
                      null === t &&
                        (46 === n.charCodeAt(i)
                          ? ((t = '.'), i++)
                          : ((t = null), 0 === o && a('"."')),
                        null === t &&
                          (33 === n.charCodeAt(i)
                            ? ((t = '!'), i++)
                            : ((t = null), 0 === o && a('"!"')),
                          null === t &&
                            (37 === n.charCodeAt(i)
                              ? ((t = '%'), i++)
                              : ((t = null), 0 === o && a('"%"')),
                            null === t &&
                              (42 === n.charCodeAt(i)
                                ? ((t = '*'), i++)
                                : ((t = null), 0 === o && a('"*"')),
                              null === t &&
                                (95 === n.charCodeAt(i)
                                  ? ((t = '_'), i++)
                                  : ((t = null), 0 === o && a('"_"')),
                                null === t &&
                                  (43 === n.charCodeAt(i)
                                    ? ((t = '+'), i++)
                                    : ((t = null), 0 === o && a('"+"')),
                                  null === t &&
                                    (96 === n.charCodeAt(i)
                                      ? ((t = '`'), i++)
                                      : ((t = null), 0 === o && a('"`"')),
                                    null === t &&
                                      (39 === n.charCodeAt(i)
                                        ? ((t = "'"), i++)
                                        : ((t = null), 0 === o && a('"\'"')),
                                      null === t &&
                                        (126 === n.charCodeAt(i)
                                          ? ((t = '~'), i++)
                                          : ((t = null), 0 === o && a('"~"')),
                                        null === t &&
                                          (40 === n.charCodeAt(i)
                                            ? ((t = '('), i++)
                                            : ((t = null), 0 === o && a('"("')),
                                          null === t &&
                                            (41 === n.charCodeAt(i)
                                              ? ((t = ')'), i++)
                                              : ((t = null),
                                                0 === o && a('")"')),
                                            null === t &&
                                              (60 === n.charCodeAt(i)
                                                ? ((t = '<'), i++)
                                                : ((t = null),
                                                  0 === o && a('"<"')),
                                              null === t &&
                                                (62 === n.charCodeAt(i)
                                                  ? ((t = '>'), i++)
                                                  : ((t = null),
                                                    0 === o && a('">"')),
                                                null === t &&
                                                  (58 === n.charCodeAt(i)
                                                    ? ((t = ':'), i++)
                                                    : ((t = null),
                                                      0 === o && a('":"')),
                                                  null === t &&
                                                    (92 === n.charCodeAt(i)
                                                      ? ((t = '\\'), i++)
                                                      : ((t = null),
                                                        0 === o && a('"\\\\"')),
                                                    null === t &&
                                                      null === (t = m()) &&
                                                      (47 === n.charCodeAt(i)
                                                        ? ((t = '/'), i++)
                                                        : ((t = null),
                                                          0 === o && a('"/"')),
                                                      null === t &&
                                                        (91 === n.charCodeAt(i)
                                                          ? ((t = '['), i++)
                                                          : ((t = null),
                                                            0 === o &&
                                                              a('"["')),
                                                        null === t &&
                                                          (93 ===
                                                          n.charCodeAt(i)
                                                            ? ((t = ']'), i++)
                                                            : ((t = null),
                                                              0 === o &&
                                                                a('"]"')),
                                                          null === t &&
                                                            (63 ===
                                                            n.charCodeAt(i)
                                                              ? ((t = '?'), i++)
                                                              : ((t = null),
                                                                0 === o &&
                                                                  a('"?"')),
                                                            null === t &&
                                                              (123 ===
                                                              n.charCodeAt(i)
                                                                ? ((t = '{'),
                                                                  i++)
                                                                : ((t = null),
                                                                  0 === o &&
                                                                    a('"{"')),
                                                              null === t &&
                                                                (125 ===
                                                                n.charCodeAt(i)
                                                                  ? ((t = '}'),
                                                                    i++)
                                                                  : ((t = null),
                                                                    0 === o &&
                                                                      a(
                                                                        '"}"'
                                                                      )))))))))))))))))))))))),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((t = '-'), i++)
                            : ((t = null), 0 === o && a('"-"')),
                          null === t &&
                            (46 === n.charCodeAt(i)
                              ? ((t = '.'), i++)
                              : ((t = null), 0 === o && a('"."')),
                            null === t &&
                              (33 === n.charCodeAt(i)
                                ? ((t = '!'), i++)
                                : ((t = null), 0 === o && a('"!"')),
                              null === t &&
                                (37 === n.charCodeAt(i)
                                  ? ((t = '%'), i++)
                                  : ((t = null), 0 === o && a('"%"')),
                                null === t &&
                                  (42 === n.charCodeAt(i)
                                    ? ((t = '*'), i++)
                                    : ((t = null), 0 === o && a('"*"')),
                                  null === t &&
                                    (95 === n.charCodeAt(i)
                                      ? ((t = '_'), i++)
                                      : ((t = null), 0 === o && a('"_"')),
                                    null === t &&
                                      (43 === n.charCodeAt(i)
                                        ? ((t = '+'), i++)
                                        : ((t = null), 0 === o && a('"+"')),
                                      null === t &&
                                        (96 === n.charCodeAt(i)
                                          ? ((t = '`'), i++)
                                          : ((t = null), 0 === o && a('"`"')),
                                        null === t &&
                                          (39 === n.charCodeAt(i)
                                            ? ((t = "'"), i++)
                                            : ((t = null),
                                              0 === o && a('"\'"')),
                                          null === t &&
                                            (126 === n.charCodeAt(i)
                                              ? ((t = '~'), i++)
                                              : ((t = null),
                                                0 === o && a('"~"')),
                                            null === t &&
                                              (40 === n.charCodeAt(i)
                                                ? ((t = '('), i++)
                                                : ((t = null),
                                                  0 === o && a('"("')),
                                              null === t &&
                                                (41 === n.charCodeAt(i)
                                                  ? ((t = ')'), i++)
                                                  : ((t = null),
                                                    0 === o && a('")"')),
                                                null === t &&
                                                  (60 === n.charCodeAt(i)
                                                    ? ((t = '<'), i++)
                                                    : ((t = null),
                                                      0 === o && a('"<"')),
                                                  null === t &&
                                                    (62 === n.charCodeAt(i)
                                                      ? ((t = '>'), i++)
                                                      : ((t = null),
                                                        0 === o && a('">"')),
                                                    null === t &&
                                                      (58 === n.charCodeAt(i)
                                                        ? ((t = ':'), i++)
                                                        : ((t = null),
                                                          0 === o && a('":"')),
                                                      null === t &&
                                                        (92 === n.charCodeAt(i)
                                                          ? ((t = '\\'), i++)
                                                          : ((t = null),
                                                            0 === o &&
                                                              a('"\\\\"')),
                                                        null === t &&
                                                          null === (t = m()) &&
                                                          (47 ===
                                                          n.charCodeAt(i)
                                                            ? ((t = '/'), i++)
                                                            : ((t = null),
                                                              0 === o &&
                                                                a('"/"')),
                                                          null === t &&
                                                            (91 ===
                                                            n.charCodeAt(i)
                                                              ? ((t = '['), i++)
                                                              : ((t = null),
                                                                0 === o &&
                                                                  a('"["')),
                                                            null === t &&
                                                              (93 ===
                                                              n.charCodeAt(i)
                                                                ? ((t = ']'),
                                                                  i++)
                                                                : ((t = null),
                                                                  0 === o &&
                                                                    a('"]"')),
                                                              null === t &&
                                                                (63 ===
                                                                n.charCodeAt(i)
                                                                  ? ((t = '?'),
                                                                    i++)
                                                                  : ((t = null),
                                                                    0 === o &&
                                                                      a('"?"')),
                                                                null === t &&
                                                                  (123 ===
                                                                  n.charCodeAt(
                                                                    i
                                                                  )
                                                                    ? ((t =
                                                                        '{'),
                                                                      i++)
                                                                    : ((t = null),
                                                                      0 === o &&
                                                                        a(
                                                                          '"{"'
                                                                        )),
                                                                  null === t &&
                                                                    (125 ===
                                                                    n.charCodeAt(
                                                                      i
                                                                    )
                                                                      ? ((t =
                                                                          '}'),
                                                                        i++)
                                                                      : ((t = null),
                                                                        0 ===
                                                                          o &&
                                                                          a(
                                                                            '"}"'
                                                                          ))))))))))))))))))))))))
                  else e = null
                  return (
                    null !== e && ((s = r), (e = n.substring(i, s))),
                    null === e && (i = r),
                    e
                  )
                }
                function x () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (42 === n.charCodeAt(i)
                          ? ((t = '*'), i++)
                          : ((t = null), 0 === o && a('"*"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = '*'),
                    null === e && (i = s),
                    e
                  )
                }
                function P () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (47 === n.charCodeAt(i)
                          ? ((t = '/'), i++)
                          : ((t = null), 0 === o && a('"/"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = '/'),
                    null === e && (i = s),
                    e
                  )
                }
                function M () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (61 === n.charCodeAt(i)
                          ? ((t = '='), i++)
                          : ((t = null), 0 === o && a('"="')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = '='),
                    null === e && (i = s),
                    e
                  )
                }
                function q () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (40 === n.charCodeAt(i)
                          ? ((t = '('), i++)
                          : ((t = null), 0 === o && a('"("')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = '('),
                    null === e && (i = s),
                    e
                  )
                }
                function L () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (41 === n.charCodeAt(i)
                          ? ((t = ')'), i++)
                          : ((t = null), 0 === o && a('")"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = ')'),
                    null === e && (i = s),
                    e
                  )
                }
                function H () {
                  var e, t, r, s
                  return (
                    (r = i),
                    (s = i),
                    62 === n.charCodeAt(i)
                      ? ((e = '>'), i++)
                      : ((e = null), 0 === o && a('">"')),
                    null !== e && null !== (t = A())
                      ? (e = [e, t])
                      : ((e = null), (i = s)),
                    null !== e && (e = '>'),
                    null === e && (i = r),
                    e
                  )
                }
                function F () {
                  var e, t, r, s
                  return (
                    (r = i),
                    (s = i),
                    null !== (e = A())
                      ? (60 === n.charCodeAt(i)
                          ? ((t = '<'), i++)
                          : ((t = null), 0 === o && a('"<"')),
                        null !== t ? (e = [e, t]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null !== e && (e = '<'),
                    null === e && (i = r),
                    e
                  )
                }
                function j () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (44 === n.charCodeAt(i)
                          ? ((t = ','), i++)
                          : ((t = null), 0 === o && a('","')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = ','),
                    null === e && (i = s),
                    e
                  )
                }
                function G () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (59 === n.charCodeAt(i)
                          ? ((t = ';'), i++)
                          : ((t = null), 0 === o && a('";"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = ';'),
                    null === e && (i = s),
                    e
                  )
                }
                function W () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = A())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = A())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && (e = ':'),
                    null === e && (i = s),
                    e
                  )
                }
                function V () {
                  var e, t, n, r
                  return (
                    (n = i),
                    (r = i),
                    null !== (e = A()) && null !== (t = m())
                      ? (e = [e, t])
                      : ((e = null), (i = r)),
                    null !== e && (e = '"'),
                    null === e && (i = n),
                    e
                  )
                }
                function B () {
                  var e, t, n, r
                  return (
                    (n = i),
                    (r = i),
                    null !== (e = m()) && null !== (t = A())
                      ? (e = [e, t])
                      : ((e = null), (i = r)),
                    null !== e && (e = '"'),
                    null === e && (i = n),
                    e
                  )
                }
                function K () {
                  var e
                  return (
                    /^[!-']/.test(n.charAt(i))
                      ? ((e = n.charAt(i)), i++)
                      : ((e = null), 0 === o && a("[!-']")),
                    null === e &&
                      (/^[*-[]/.test(n.charAt(i))
                        ? ((e = n.charAt(i)), i++)
                        : ((e = null), 0 === o && a('[*-[]')),
                      null === e &&
                        (/^[\]-~]/.test(n.charAt(i))
                          ? ((e = n.charAt(i)), i++)
                          : ((e = null), 0 === o && a('[\\]-~]')),
                        null === e && null === (e = O()) && (e = E()))),
                    e
                  )
                }
                function z () {
                  var e, t, r, s, o, l, u
                  if (((o = i), (l = i), null !== (e = A())))
                    if (null !== (t = m())) {
                      for (
                        r = [], null === (s = $()) && (s = X());
                        null !== s;

                      )
                        r.push(s), null === (s = $()) && (s = X())
                      null !== r && null !== (s = m())
                        ? (e = [e, t, r, s])
                        : ((e = null), (i = l))
                    } else (e = null), (i = l)
                  else (e = null), (i = l)
                  return (
                    null !== e && ((u = o), (e = n.substring(i, u))),
                    null === e && (i = o),
                    e
                  )
                }
                function Y () {
                  var e, t, r, s, o, l, u, a
                  if (((o = i), (l = i), null !== (e = A())))
                    if (null !== (t = m())) {
                      for (
                        r = [], null === (s = $()) && (s = X());
                        null !== s;

                      )
                        r.push(s), null === (s = $()) && (s = X())
                      null !== r && null !== (s = m())
                        ? (e = [e, t, r, s])
                        : ((e = null), (i = l))
                    } else (e = null), (i = l)
                  else (e = null), (i = l)
                  return (
                    null !== e &&
                      ((u = o),
                      (e = (a = n.substring(i, u).trim())
                        .substring(1, a.length - 1)
                        .replace(/\\([\x00-\x09\x0b-\x0c\x0e-\x7f])/g, '$1'))),
                    null === e && (i = o),
                    e
                  )
                }
                function $ () {
                  var e
                  return (
                    null === (e = E()) &&
                      (33 === n.charCodeAt(i)
                        ? ((e = '!'), i++)
                        : ((e = null), 0 === o && a('"!"')),
                      null === e &&
                        (/^[#-[]/.test(n.charAt(i))
                          ? ((e = n.charAt(i)), i++)
                          : ((e = null), 0 === o && a('[#-[]')),
                        null === e &&
                          (/^[\]-~]/.test(n.charAt(i))
                            ? ((e = n.charAt(i)), i++)
                            : ((e = null), 0 === o && a('[\\]-~]')),
                          null === e && (e = O())))),
                    e
                  )
                }
                function X () {
                  var e, t, r
                  return (
                    (r = i),
                    92 === n.charCodeAt(i)
                      ? ((e = '\\'), i++)
                      : ((e = null), 0 === o && a('"\\\\"')),
                    null !== e
                      ? (/^[\0-\t]/.test(n.charAt(i))
                          ? ((t = n.charAt(i)), i++)
                          : ((t = null), 0 === o && a('[\\0-\\t]')),
                        null === t &&
                          (/^[\x0B-\f]/.test(n.charAt(i))
                            ? ((t = n.charAt(i)), i++)
                            : ((t = null), 0 === o && a('[\\x0B-\\f]')),
                          null === t &&
                            (/^[\x0E-]/.test(n.charAt(i))
                              ? ((t = n.charAt(i)), i++)
                              : ((t = null), 0 === o && a('[\\x0E-]')))),
                        null !== t ? (e = [e, t]) : ((e = null), (i = r)))
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function J () {
                  var e, t, r, s, l, u
                  return (
                    (l = i),
                    (u = i),
                    null !== (e = Z())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t &&
                        null !== (r = null !== (r = ne()) ? r : '') &&
                        null !== (s = oe())
                          ? (e = [e, t, r, s])
                          : ((e = null), (i = u)))
                      : ((e = null), (i = u)),
                    null !== e &&
                      (e = (function (e) {
                        try {
                          ;(jn.uri = new Hn(
                            jn.scheme,
                            jn.user,
                            jn.host,
                            jn.port
                          )),
                            delete jn.scheme,
                            delete jn.user,
                            delete jn.host,
                            delete jn.host_type,
                            delete jn.port
                        } catch (e) {
                          jn = -1
                        }
                      })()),
                    null === e && (i = l),
                    e
                  )
                }
                function Q () {
                  var e, t, s, l, u, c, h, d
                  return (
                    (h = i),
                    (d = i),
                    null !== (e = Z())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t &&
                        null !== (s = null !== (s = ne()) ? s : '') &&
                        null !== (l = oe()) &&
                        null !== (u = ge()) &&
                        null !== (c = null !== (c = Ne()) ? c : '')
                          ? (e = [e, t, s, l, u, c])
                          : ((e = null), (i = d)))
                      : ((e = null), (i = d)),
                    null !== e &&
                      (e = (function (e) {
                        try {
                          ;(jn.uri = new Hn(
                            jn.scheme,
                            jn.user,
                            jn.host,
                            jn.port,
                            jn.uri_params,
                            jn.uri_headers
                          )),
                            delete jn.scheme,
                            delete jn.user,
                            delete jn.host,
                            delete jn.host_type,
                            delete jn.port,
                            delete jn.uri_params,
                            'SIP_URI' === r && (jn = jn.uri)
                        } catch (e) {
                          jn = -1
                        }
                      })()),
                    null === e && (i = h),
                    e
                  )
                }
                function Z () {
                  var e
                  return null === (e = ee()) && (e = te()), e
                }
                function ee () {
                  var e, t, r
                  return (
                    (t = i),
                    'sips' === n.substr(i, 4).toLowerCase()
                      ? ((e = n.substr(i, 4)), (i += 4))
                      : ((e = null), 0 === o && a('"sips"')),
                    null !== e &&
                      ((r = e), (e = void (jn.scheme = r.toLowerCase()))),
                    null === e && (i = t),
                    e
                  )
                }
                function te () {
                  var e, t, r
                  return (
                    (t = i),
                    'sip' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"sip"')),
                    null !== e &&
                      ((r = e), (e = void (jn.scheme = r.toLowerCase()))),
                    null === e && (i = t),
                    e
                  )
                }
                function ne () {
                  var e, t, r, s, l, u, c
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = re())
                      ? ((u = i),
                        58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = ie())
                          ? (t = [t, r])
                          : ((t = null), (i = u)),
                        null !== (t = null !== t ? t : '')
                          ? (64 === n.charCodeAt(i)
                              ? ((r = '@'), i++)
                              : ((r = null), 0 === o && a('"@"')),
                            null !== r
                              ? (e = [e, t, r])
                              : ((e = null), (i = l)))
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((c = s),
                      (e = void (jn.user = decodeURIComponent(
                        n.substring(i - 1, c)
                      )))),
                    null === e && (i = s),
                    e
                  )
                }
                function re () {
                  var e, t
                  if (
                    (null === (t = C()) && null === (t = S()) && (t = se()),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = C()) && null === (t = S()) && (t = se())
                  else e = null
                  return e
                }
                function se () {
                  var e
                  return (
                    38 === n.charCodeAt(i)
                      ? ((e = '&'), i++)
                      : ((e = null), 0 === o && a('"&"')),
                    null === e &&
                      (61 === n.charCodeAt(i)
                        ? ((e = '='), i++)
                        : ((e = null), 0 === o && a('"="')),
                      null === e &&
                        (43 === n.charCodeAt(i)
                          ? ((e = '+'), i++)
                          : ((e = null), 0 === o && a('"+"')),
                        null === e &&
                          (36 === n.charCodeAt(i)
                            ? ((e = '$'), i++)
                            : ((e = null), 0 === o && a('"$"')),
                          null === e &&
                            (44 === n.charCodeAt(i)
                              ? ((e = ','), i++)
                              : ((e = null), 0 === o && a('","')),
                            null === e &&
                              (59 === n.charCodeAt(i)
                                ? ((e = ';'), i++)
                                : ((e = null), 0 === o && a('";"')),
                              null === e &&
                                (63 === n.charCodeAt(i)
                                  ? ((e = '?'), i++)
                                  : ((e = null), 0 === o && a('"?"')),
                                null === e &&
                                  (47 === n.charCodeAt(i)
                                    ? ((e = '/'), i++)
                                    : ((e = null), 0 === o && a('"/"'))))))))),
                    e
                  )
                }
                function ie () {
                  var e, t, r, s
                  for (
                    r = i,
                      e = [],
                      null === (t = C()) &&
                        null === (t = S()) &&
                        (38 === n.charCodeAt(i)
                          ? ((t = '&'), i++)
                          : ((t = null), 0 === o && a('"&"')),
                        null === t &&
                          (61 === n.charCodeAt(i)
                            ? ((t = '='), i++)
                            : ((t = null), 0 === o && a('"="')),
                          null === t &&
                            (43 === n.charCodeAt(i)
                              ? ((t = '+'), i++)
                              : ((t = null), 0 === o && a('"+"')),
                            null === t &&
                              (36 === n.charCodeAt(i)
                                ? ((t = '$'), i++)
                                : ((t = null), 0 === o && a('"$"')),
                              null === t &&
                                (44 === n.charCodeAt(i)
                                  ? ((t = ','), i++)
                                  : ((t = null), 0 === o && a('","')))))));
                    null !== t;

                  )
                    e.push(t),
                      null === (t = C()) &&
                        null === (t = S()) &&
                        (38 === n.charCodeAt(i)
                          ? ((t = '&'), i++)
                          : ((t = null), 0 === o && a('"&"')),
                        null === t &&
                          (61 === n.charCodeAt(i)
                            ? ((t = '='), i++)
                            : ((t = null), 0 === o && a('"="')),
                          null === t &&
                            (43 === n.charCodeAt(i)
                              ? ((t = '+'), i++)
                              : ((t = null), 0 === o && a('"+"')),
                            null === t &&
                              (36 === n.charCodeAt(i)
                                ? ((t = '$'), i++)
                                : ((t = null), 0 === o && a('"$"')),
                              null === t &&
                                (44 === n.charCodeAt(i)
                                  ? ((t = ','), i++)
                                  : ((t = null), 0 === o && a('","')))))))
                  return (
                    null !== e &&
                      ((s = r), (e = void (jn.password = n.substring(i, s)))),
                    null === e && (i = r),
                    e
                  )
                }
                function oe () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    null !== (e = le())
                      ? ((l = i),
                        58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = ve())
                          ? (t = [t, r])
                          : ((t = null), (i = l)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function le () {
                  var e, t, r
                  return (
                    (t = i),
                    null === (e = ue()) && null === (e = pe()) && (e = he()),
                    null !== e &&
                      ((r = t),
                      (jn.host = n.substring(i, r).toLowerCase()),
                      (e = jn.host)),
                    null === e && (i = t),
                    e
                  )
                }
                function ue () {
                  var e, t, r, s, l, u, c
                  for (
                    s = i,
                      l = i,
                      e = [],
                      u = i,
                      null !== (t = ae())
                        ? (46 === n.charCodeAt(i)
                            ? ((r = '.'), i++)
                            : ((r = null), 0 === o && a('"."')),
                          null !== r ? (t = [t, r]) : ((t = null), (i = u)))
                        : ((t = null), (i = u));
                    null !== t;

                  )
                    e.push(t),
                      (u = i),
                      null !== (t = ae())
                        ? (46 === n.charCodeAt(i)
                            ? ((r = '.'), i++)
                            : ((r = null), 0 === o && a('"."')),
                          null !== r ? (t = [t, r]) : ((t = null), (i = u)))
                        : ((t = null), (i = u))
                  return (
                    null !== e && null !== (t = ce())
                      ? (46 === n.charCodeAt(i)
                          ? ((r = '.'), i++)
                          : ((r = null), 0 === o && a('"."')),
                        null !== (r = null !== r ? r : '')
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((c = s),
                      (jn.host_type = 'domain'),
                      (e = n.substring(i, c))),
                    null === e && (i = s),
                    e
                  )
                }
                function ae () {
                  var e, t, r, s
                  if (((s = i), null !== (e = y()))) {
                    for (
                      t = [],
                        null === (r = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((r = '-'), i++)
                            : ((r = null), 0 === o && a('"-"')),
                          null === r &&
                            (95 === n.charCodeAt(i)
                              ? ((r = '_'), i++)
                              : ((r = null), 0 === o && a('"_"'))));
                      null !== r;

                    )
                      t.push(r),
                        null === (r = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((r = '-'), i++)
                            : ((r = null), 0 === o && a('"-"')),
                          null === r &&
                            (95 === n.charCodeAt(i)
                              ? ((r = '_'), i++)
                              : ((r = null), 0 === o && a('"_"'))))
                    null !== t ? (e = [e, t]) : ((e = null), (i = s))
                  } else (e = null), (i = s)
                  return e
                }
                function ce () {
                  var e, t, r, s
                  if (((s = i), null !== (e = d()))) {
                    for (
                      t = [],
                        null === (r = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((r = '-'), i++)
                            : ((r = null), 0 === o && a('"-"')),
                          null === r &&
                            (95 === n.charCodeAt(i)
                              ? ((r = '_'), i++)
                              : ((r = null), 0 === o && a('"_"'))));
                      null !== r;

                    )
                      t.push(r),
                        null === (r = y()) &&
                          (45 === n.charCodeAt(i)
                            ? ((r = '-'), i++)
                            : ((r = null), 0 === o && a('"-"')),
                          null === r &&
                            (95 === n.charCodeAt(i)
                              ? ((r = '_'), i++)
                              : ((r = null), 0 === o && a('"_"'))))
                    null !== t ? (e = [e, t]) : ((e = null), (i = s))
                  } else (e = null), (i = s)
                  return e
                }
                function he () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    91 === n.charCodeAt(i)
                      ? ((e = '['), i++)
                      : ((e = null), 0 === o && a('"["')),
                    null !== e && null !== (t = de())
                      ? (93 === n.charCodeAt(i)
                          ? ((r = ']'), i++)
                          : ((r = null), 0 === o && a('"]"')),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = s),
                      (jn.host_type = 'IPv6'),
                      (e = n.substring(i, u))),
                    null === e && (i = s),
                    e
                  )
                }
                function de () {
                  var e, t, r, s, l, u, c, h, d, f, _, p, m, v, g, y, T
                  return (
                    (v = i),
                    (g = i),
                    null !== (e = fe())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = fe())
                          ? (58 === n.charCodeAt(i)
                              ? ((s = ':'), i++)
                              : ((s = null), 0 === o && a('":"')),
                            null !== s && null !== (l = fe())
                              ? (58 === n.charCodeAt(i)
                                  ? ((u = ':'), i++)
                                  : ((u = null), 0 === o && a('":"')),
                                null !== u && null !== (c = fe())
                                  ? (58 === n.charCodeAt(i)
                                      ? ((h = ':'), i++)
                                      : ((h = null), 0 === o && a('":"')),
                                    null !== h && null !== (d = fe())
                                      ? (58 === n.charCodeAt(i)
                                          ? ((f = ':'), i++)
                                          : ((f = null), 0 === o && a('":"')),
                                        null !== f && null !== (_ = fe())
                                          ? (58 === n.charCodeAt(i)
                                              ? ((p = ':'), i++)
                                              : ((p = null),
                                                0 === o && a('":"')),
                                            null !== p && null !== (m = _e())
                                              ? (e = [
                                                  e,
                                                  t,
                                                  r,
                                                  s,
                                                  l,
                                                  u,
                                                  c,
                                                  h,
                                                  d,
                                                  f,
                                                  _,
                                                  p,
                                                  m
                                                ])
                                              : ((e = null), (i = g)))
                                          : ((e = null), (i = g)))
                                      : ((e = null), (i = g)))
                                  : ((e = null), (i = g)))
                              : ((e = null), (i = g)))
                          : ((e = null), (i = g)))
                      : ((e = null), (i = g)),
                    null === e &&
                      ((g = i),
                      '::' === n.substr(i, 2)
                        ? ((e = '::'), (i += 2))
                        : ((e = null), 0 === o && a('"::"')),
                      null !== e && null !== (t = fe())
                        ? (58 === n.charCodeAt(i)
                            ? ((r = ':'), i++)
                            : ((r = null), 0 === o && a('":"')),
                          null !== r && null !== (s = fe())
                            ? (58 === n.charCodeAt(i)
                                ? ((l = ':'), i++)
                                : ((l = null), 0 === o && a('":"')),
                              null !== l && null !== (u = fe())
                                ? (58 === n.charCodeAt(i)
                                    ? ((c = ':'), i++)
                                    : ((c = null), 0 === o && a('":"')),
                                  null !== c && null !== (h = fe())
                                    ? (58 === n.charCodeAt(i)
                                        ? ((d = ':'), i++)
                                        : ((d = null), 0 === o && a('":"')),
                                      null !== d && null !== (f = fe())
                                        ? (58 === n.charCodeAt(i)
                                            ? ((_ = ':'), i++)
                                            : ((_ = null), 0 === o && a('":"')),
                                          null !== _ && null !== (p = _e())
                                            ? (e = [
                                                e,
                                                t,
                                                r,
                                                s,
                                                l,
                                                u,
                                                c,
                                                h,
                                                d,
                                                f,
                                                _,
                                                p
                                              ])
                                            : ((e = null), (i = g)))
                                        : ((e = null), (i = g)))
                                    : ((e = null), (i = g)))
                                : ((e = null), (i = g)))
                            : ((e = null), (i = g)))
                        : ((e = null), (i = g)),
                      null === e &&
                        ((g = i),
                        '::' === n.substr(i, 2)
                          ? ((e = '::'), (i += 2))
                          : ((e = null), 0 === o && a('"::"')),
                        null !== e && null !== (t = fe())
                          ? (58 === n.charCodeAt(i)
                              ? ((r = ':'), i++)
                              : ((r = null), 0 === o && a('":"')),
                            null !== r && null !== (s = fe())
                              ? (58 === n.charCodeAt(i)
                                  ? ((l = ':'), i++)
                                  : ((l = null), 0 === o && a('":"')),
                                null !== l && null !== (u = fe())
                                  ? (58 === n.charCodeAt(i)
                                      ? ((c = ':'), i++)
                                      : ((c = null), 0 === o && a('":"')),
                                    null !== c && null !== (h = fe())
                                      ? (58 === n.charCodeAt(i)
                                          ? ((d = ':'), i++)
                                          : ((d = null), 0 === o && a('":"')),
                                        null !== d && null !== (f = _e())
                                          ? (e = [e, t, r, s, l, u, c, h, d, f])
                                          : ((e = null), (i = g)))
                                      : ((e = null), (i = g)))
                                  : ((e = null), (i = g)))
                              : ((e = null), (i = g)))
                          : ((e = null), (i = g)),
                        null === e &&
                          ((g = i),
                          '::' === n.substr(i, 2)
                            ? ((e = '::'), (i += 2))
                            : ((e = null), 0 === o && a('"::"')),
                          null !== e && null !== (t = fe())
                            ? (58 === n.charCodeAt(i)
                                ? ((r = ':'), i++)
                                : ((r = null), 0 === o && a('":"')),
                              null !== r && null !== (s = fe())
                                ? (58 === n.charCodeAt(i)
                                    ? ((l = ':'), i++)
                                    : ((l = null), 0 === o && a('":"')),
                                  null !== l && null !== (u = fe())
                                    ? (58 === n.charCodeAt(i)
                                        ? ((c = ':'), i++)
                                        : ((c = null), 0 === o && a('":"')),
                                      null !== c && null !== (h = _e())
                                        ? (e = [e, t, r, s, l, u, c, h])
                                        : ((e = null), (i = g)))
                                    : ((e = null), (i = g)))
                                : ((e = null), (i = g)))
                            : ((e = null), (i = g)),
                          null === e &&
                            ((g = i),
                            '::' === n.substr(i, 2)
                              ? ((e = '::'), (i += 2))
                              : ((e = null), 0 === o && a('"::"')),
                            null !== e && null !== (t = fe())
                              ? (58 === n.charCodeAt(i)
                                  ? ((r = ':'), i++)
                                  : ((r = null), 0 === o && a('":"')),
                                null !== r && null !== (s = fe())
                                  ? (58 === n.charCodeAt(i)
                                      ? ((l = ':'), i++)
                                      : ((l = null), 0 === o && a('":"')),
                                    null !== l && null !== (u = _e())
                                      ? (e = [e, t, r, s, l, u])
                                      : ((e = null), (i = g)))
                                  : ((e = null), (i = g)))
                              : ((e = null), (i = g)),
                            null === e &&
                              ((g = i),
                              '::' === n.substr(i, 2)
                                ? ((e = '::'), (i += 2))
                                : ((e = null), 0 === o && a('"::"')),
                              null !== e && null !== (t = fe())
                                ? (58 === n.charCodeAt(i)
                                    ? ((r = ':'), i++)
                                    : ((r = null), 0 === o && a('":"')),
                                  null !== r && null !== (s = _e())
                                    ? (e = [e, t, r, s])
                                    : ((e = null), (i = g)))
                                : ((e = null), (i = g)),
                              null === e &&
                                ((g = i),
                                '::' === n.substr(i, 2)
                                  ? ((e = '::'), (i += 2))
                                  : ((e = null), 0 === o && a('"::"')),
                                null !== e && null !== (t = _e())
                                  ? (e = [e, t])
                                  : ((e = null), (i = g)),
                                null === e &&
                                  ((g = i),
                                  '::' === n.substr(i, 2)
                                    ? ((e = '::'), (i += 2))
                                    : ((e = null), 0 === o && a('"::"')),
                                  null !== e && null !== (t = fe())
                                    ? (e = [e, t])
                                    : ((e = null), (i = g)),
                                  null === e &&
                                    ((g = i),
                                    null !== (e = fe())
                                      ? ('::' === n.substr(i, 2)
                                          ? ((t = '::'), (i += 2))
                                          : ((t = null), 0 === o && a('"::"')),
                                        null !== t && null !== (r = fe())
                                          ? (58 === n.charCodeAt(i)
                                              ? ((s = ':'), i++)
                                              : ((s = null),
                                                0 === o && a('":"')),
                                            null !== s && null !== (l = fe())
                                              ? (58 === n.charCodeAt(i)
                                                  ? ((u = ':'), i++)
                                                  : ((u = null),
                                                    0 === o && a('":"')),
                                                null !== u &&
                                                null !== (c = fe())
                                                  ? (58 === n.charCodeAt(i)
                                                      ? ((h = ':'), i++)
                                                      : ((h = null),
                                                        0 === o && a('":"')),
                                                    null !== h &&
                                                    null !== (d = fe())
                                                      ? (58 === n.charCodeAt(i)
                                                          ? ((f = ':'), i++)
                                                          : ((f = null),
                                                            0 === o &&
                                                              a('":"')),
                                                        null !== f &&
                                                        null !== (_ = _e())
                                                          ? (e = [
                                                              e,
                                                              t,
                                                              r,
                                                              s,
                                                              l,
                                                              u,
                                                              c,
                                                              h,
                                                              d,
                                                              f,
                                                              _
                                                            ])
                                                          : ((e = null),
                                                            (i = g)))
                                                      : ((e = null), (i = g)))
                                                  : ((e = null), (i = g)))
                                              : ((e = null), (i = g)))
                                          : ((e = null), (i = g)))
                                      : ((e = null), (i = g)),
                                    null === e &&
                                      ((g = i),
                                      null !== (e = fe())
                                        ? ((y = i),
                                          58 === n.charCodeAt(i)
                                            ? ((t = ':'), i++)
                                            : ((t = null), 0 === o && a('":"')),
                                          null !== t && null !== (r = fe())
                                            ? (t = [t, r])
                                            : ((t = null), (i = y)),
                                          null !== (t = null !== t ? t : '')
                                            ? ('::' === n.substr(i, 2)
                                                ? ((r = '::'), (i += 2))
                                                : ((r = null),
                                                  0 === o && a('"::"')),
                                              null !== r && null !== (s = fe())
                                                ? (58 === n.charCodeAt(i)
                                                    ? ((l = ':'), i++)
                                                    : ((l = null),
                                                      0 === o && a('":"')),
                                                  null !== l &&
                                                  null !== (u = fe())
                                                    ? (58 === n.charCodeAt(i)
                                                        ? ((c = ':'), i++)
                                                        : ((c = null),
                                                          0 === o && a('":"')),
                                                      null !== c &&
                                                      null !== (h = fe())
                                                        ? (58 ===
                                                          n.charCodeAt(i)
                                                            ? ((d = ':'), i++)
                                                            : ((d = null),
                                                              0 === o &&
                                                                a('":"')),
                                                          null !== d &&
                                                          null !== (f = _e())
                                                            ? (e = [
                                                                e,
                                                                t,
                                                                r,
                                                                s,
                                                                l,
                                                                u,
                                                                c,
                                                                h,
                                                                d,
                                                                f
                                                              ])
                                                            : ((e = null),
                                                              (i = g)))
                                                        : ((e = null), (i = g)))
                                                    : ((e = null), (i = g)))
                                                : ((e = null), (i = g)))
                                            : ((e = null), (i = g)))
                                        : ((e = null), (i = g)),
                                      null === e &&
                                        ((g = i),
                                        null !== (e = fe())
                                          ? ((y = i),
                                            58 === n.charCodeAt(i)
                                              ? ((t = ':'), i++)
                                              : ((t = null),
                                                0 === o && a('":"')),
                                            null !== t && null !== (r = fe())
                                              ? (t = [t, r])
                                              : ((t = null), (i = y)),
                                            null !== (t = null !== t ? t : '')
                                              ? ((y = i),
                                                58 === n.charCodeAt(i)
                                                  ? ((r = ':'), i++)
                                                  : ((r = null),
                                                    0 === o && a('":"')),
                                                null !== r &&
                                                null !== (s = fe())
                                                  ? (r = [r, s])
                                                  : ((r = null), (i = y)),
                                                null !==
                                                (r = null !== r ? r : '')
                                                  ? ('::' === n.substr(i, 2)
                                                      ? ((s = '::'), (i += 2))
                                                      : ((s = null),
                                                        0 === o && a('"::"')),
                                                    null !== s &&
                                                    null !== (l = fe())
                                                      ? (58 === n.charCodeAt(i)
                                                          ? ((u = ':'), i++)
                                                          : ((u = null),
                                                            0 === o &&
                                                              a('":"')),
                                                        null !== u &&
                                                        null !== (c = fe())
                                                          ? (58 ===
                                                            n.charCodeAt(i)
                                                              ? ((h = ':'), i++)
                                                              : ((h = null),
                                                                0 === o &&
                                                                  a('":"')),
                                                            null !== h &&
                                                            null !== (d = _e())
                                                              ? (e = [
                                                                  e,
                                                                  t,
                                                                  r,
                                                                  s,
                                                                  l,
                                                                  u,
                                                                  c,
                                                                  h,
                                                                  d
                                                                ])
                                                              : ((e = null),
                                                                (i = g)))
                                                          : ((e = null),
                                                            (i = g)))
                                                      : ((e = null), (i = g)))
                                                  : ((e = null), (i = g)))
                                              : ((e = null), (i = g)))
                                          : ((e = null), (i = g)),
                                        null === e &&
                                          ((g = i),
                                          null !== (e = fe())
                                            ? ((y = i),
                                              58 === n.charCodeAt(i)
                                                ? ((t = ':'), i++)
                                                : ((t = null),
                                                  0 === o && a('":"')),
                                              null !== t && null !== (r = fe())
                                                ? (t = [t, r])
                                                : ((t = null), (i = y)),
                                              null !== (t = null !== t ? t : '')
                                                ? ((y = i),
                                                  58 === n.charCodeAt(i)
                                                    ? ((r = ':'), i++)
                                                    : ((r = null),
                                                      0 === o && a('":"')),
                                                  null !== r &&
                                                  null !== (s = fe())
                                                    ? (r = [r, s])
                                                    : ((r = null), (i = y)),
                                                  null !==
                                                  (r = null !== r ? r : '')
                                                    ? ((y = i),
                                                      58 === n.charCodeAt(i)
                                                        ? ((s = ':'), i++)
                                                        : ((s = null),
                                                          0 === o && a('":"')),
                                                      null !== s &&
                                                      null !== (l = fe())
                                                        ? (s = [s, l])
                                                        : ((s = null), (i = y)),
                                                      null !==
                                                      (s = null !== s ? s : '')
                                                        ? ('::' ===
                                                          n.substr(i, 2)
                                                            ? ((l = '::'),
                                                              (i += 2))
                                                            : ((l = null),
                                                              0 === o &&
                                                                a('"::"')),
                                                          null !== l &&
                                                          null !== (u = fe())
                                                            ? (58 ===
                                                              n.charCodeAt(i)
                                                                ? ((c = ':'),
                                                                  i++)
                                                                : ((c = null),
                                                                  0 === o &&
                                                                    a('":"')),
                                                              null !== c &&
                                                              null !==
                                                                (h = _e())
                                                                ? (e = [
                                                                    e,
                                                                    t,
                                                                    r,
                                                                    s,
                                                                    l,
                                                                    u,
                                                                    c,
                                                                    h
                                                                  ])
                                                                : ((e = null),
                                                                  (i = g)))
                                                            : ((e = null),
                                                              (i = g)))
                                                        : ((e = null), (i = g)))
                                                    : ((e = null), (i = g)))
                                                : ((e = null), (i = g)))
                                            : ((e = null), (i = g)),
                                          null === e &&
                                            ((g = i),
                                            null !== (e = fe())
                                              ? ((y = i),
                                                58 === n.charCodeAt(i)
                                                  ? ((t = ':'), i++)
                                                  : ((t = null),
                                                    0 === o && a('":"')),
                                                null !== t &&
                                                null !== (r = fe())
                                                  ? (t = [t, r])
                                                  : ((t = null), (i = y)),
                                                null !==
                                                (t = null !== t ? t : '')
                                                  ? ((y = i),
                                                    58 === n.charCodeAt(i)
                                                      ? ((r = ':'), i++)
                                                      : ((r = null),
                                                        0 === o && a('":"')),
                                                    null !== r &&
                                                    null !== (s = fe())
                                                      ? (r = [r, s])
                                                      : ((r = null), (i = y)),
                                                    null !==
                                                    (r = null !== r ? r : '')
                                                      ? ((y = i),
                                                        58 === n.charCodeAt(i)
                                                          ? ((s = ':'), i++)
                                                          : ((s = null),
                                                            0 === o &&
                                                              a('":"')),
                                                        null !== s &&
                                                        null !== (l = fe())
                                                          ? (s = [s, l])
                                                          : ((s = null),
                                                            (i = y)),
                                                        null !==
                                                        (s =
                                                          null !== s ? s : '')
                                                          ? ((y = i),
                                                            58 ===
                                                            n.charCodeAt(i)
                                                              ? ((l = ':'), i++)
                                                              : ((l = null),
                                                                0 === o &&
                                                                  a('":"')),
                                                            null !== l &&
                                                            null !== (u = fe())
                                                              ? (l = [l, u])
                                                              : ((l = null),
                                                                (i = y)),
                                                            null !==
                                                            (l =
                                                              null !== l
                                                                ? l
                                                                : '')
                                                              ? ('::' ===
                                                                n.substr(i, 2)
                                                                  ? ((u = '::'),
                                                                    (i += 2))
                                                                  : ((u = null),
                                                                    0 === o &&
                                                                      a(
                                                                        '"::"'
                                                                      )),
                                                                null !== u &&
                                                                null !==
                                                                  (c = _e())
                                                                  ? (e = [
                                                                      e,
                                                                      t,
                                                                      r,
                                                                      s,
                                                                      l,
                                                                      u,
                                                                      c
                                                                    ])
                                                                  : ((e = null),
                                                                    (i = g)))
                                                              : ((e = null),
                                                                (i = g)))
                                                          : ((e = null),
                                                            (i = g)))
                                                      : ((e = null), (i = g)))
                                                  : ((e = null), (i = g)))
                                              : ((e = null), (i = g)),
                                            null === e &&
                                              ((g = i),
                                              null !== (e = fe())
                                                ? ((y = i),
                                                  58 === n.charCodeAt(i)
                                                    ? ((t = ':'), i++)
                                                    : ((t = null),
                                                      0 === o && a('":"')),
                                                  null !== t &&
                                                  null !== (r = fe())
                                                    ? (t = [t, r])
                                                    : ((t = null), (i = y)),
                                                  null !==
                                                  (t = null !== t ? t : '')
                                                    ? ((y = i),
                                                      58 === n.charCodeAt(i)
                                                        ? ((r = ':'), i++)
                                                        : ((r = null),
                                                          0 === o && a('":"')),
                                                      null !== r &&
                                                      null !== (s = fe())
                                                        ? (r = [r, s])
                                                        : ((r = null), (i = y)),
                                                      null !==
                                                      (r = null !== r ? r : '')
                                                        ? ((y = i),
                                                          58 === n.charCodeAt(i)
                                                            ? ((s = ':'), i++)
                                                            : ((s = null),
                                                              0 === o &&
                                                                a('":"')),
                                                          null !== s &&
                                                          null !== (l = fe())
                                                            ? (s = [s, l])
                                                            : ((s = null),
                                                              (i = y)),
                                                          null !==
                                                          (s =
                                                            null !== s ? s : '')
                                                            ? ((y = i),
                                                              58 ===
                                                              n.charCodeAt(i)
                                                                ? ((l = ':'),
                                                                  i++)
                                                                : ((l = null),
                                                                  0 === o &&
                                                                    a('":"')),
                                                              null !== l &&
                                                              null !==
                                                                (u = fe())
                                                                ? (l = [l, u])
                                                                : ((l = null),
                                                                  (i = y)),
                                                              null !==
                                                              (l =
                                                                null !== l
                                                                  ? l
                                                                  : '')
                                                                ? ((y = i),
                                                                  58 ===
                                                                  n.charCodeAt(
                                                                    i
                                                                  )
                                                                    ? ((u =
                                                                        ':'),
                                                                      i++)
                                                                    : ((u = null),
                                                                      0 === o &&
                                                                        a(
                                                                          '":"'
                                                                        )),
                                                                  null !== u &&
                                                                  null !==
                                                                    (c = fe())
                                                                    ? (u = [
                                                                        u,
                                                                        c
                                                                      ])
                                                                    : ((u = null),
                                                                      (i = y)),
                                                                  null !==
                                                                  (u =
                                                                    null !== u
                                                                      ? u
                                                                      : '')
                                                                    ? ('::' ===
                                                                      n.substr(
                                                                        i,
                                                                        2
                                                                      )
                                                                        ? ((c =
                                                                            '::'),
                                                                          (i += 2))
                                                                        : ((c = null),
                                                                          0 ===
                                                                            o &&
                                                                            a(
                                                                              '"::"'
                                                                            )),
                                                                      null !==
                                                                        c &&
                                                                      null !==
                                                                        (h = fe())
                                                                        ? (e = [
                                                                            e,
                                                                            t,
                                                                            r,
                                                                            s,
                                                                            l,
                                                                            u,
                                                                            c,
                                                                            h
                                                                          ])
                                                                        : ((e = null),
                                                                          (i = g)))
                                                                    : ((e = null),
                                                                      (i = g)))
                                                                : ((e = null),
                                                                  (i = g)))
                                                            : ((e = null),
                                                              (i = g)))
                                                        : ((e = null), (i = g)))
                                                    : ((e = null), (i = g)))
                                                : ((e = null), (i = g)),
                                              null === e &&
                                                ((g = i),
                                                null !== (e = fe())
                                                  ? ((y = i),
                                                    58 === n.charCodeAt(i)
                                                      ? ((t = ':'), i++)
                                                      : ((t = null),
                                                        0 === o && a('":"')),
                                                    null !== t &&
                                                    null !== (r = fe())
                                                      ? (t = [t, r])
                                                      : ((t = null), (i = y)),
                                                    null !==
                                                    (t = null !== t ? t : '')
                                                      ? ((y = i),
                                                        58 === n.charCodeAt(i)
                                                          ? ((r = ':'), i++)
                                                          : ((r = null),
                                                            0 === o &&
                                                              a('":"')),
                                                        null !== r &&
                                                        null !== (s = fe())
                                                          ? (r = [r, s])
                                                          : ((r = null),
                                                            (i = y)),
                                                        null !==
                                                        (r =
                                                          null !== r ? r : '')
                                                          ? ((y = i),
                                                            58 ===
                                                            n.charCodeAt(i)
                                                              ? ((s = ':'), i++)
                                                              : ((s = null),
                                                                0 === o &&
                                                                  a('":"')),
                                                            null !== s &&
                                                            null !== (l = fe())
                                                              ? (s = [s, l])
                                                              : ((s = null),
                                                                (i = y)),
                                                            null !==
                                                            (s =
                                                              null !== s
                                                                ? s
                                                                : '')
                                                              ? ((y = i),
                                                                58 ===
                                                                n.charCodeAt(i)
                                                                  ? ((l = ':'),
                                                                    i++)
                                                                  : ((l = null),
                                                                    0 === o &&
                                                                      a('":"')),
                                                                null !== l &&
                                                                null !==
                                                                  (u = fe())
                                                                  ? (l = [l, u])
                                                                  : ((l = null),
                                                                    (i = y)),
                                                                null !==
                                                                (l =
                                                                  null !== l
                                                                    ? l
                                                                    : '')
                                                                  ? ((y = i),
                                                                    58 ===
                                                                    n.charCodeAt(
                                                                      i
                                                                    )
                                                                      ? ((u =
                                                                          ':'),
                                                                        i++)
                                                                      : ((u = null),
                                                                        0 ===
                                                                          o &&
                                                                          a(
                                                                            '":"'
                                                                          )),
                                                                    null !==
                                                                      u &&
                                                                    null !==
                                                                      (c = fe())
                                                                      ? (u = [
                                                                          u,
                                                                          c
                                                                        ])
                                                                      : ((u = null),
                                                                        (i = y)),
                                                                    null !==
                                                                    (u =
                                                                      null !== u
                                                                        ? u
                                                                        : '')
                                                                      ? ((y = i),
                                                                        58 ===
                                                                        n.charCodeAt(
                                                                          i
                                                                        )
                                                                          ? ((c =
                                                                              ':'),
                                                                            i++)
                                                                          : ((c = null),
                                                                            0 ===
                                                                              o &&
                                                                              a(
                                                                                '":"'
                                                                              )),
                                                                        null !==
                                                                          c &&
                                                                        null !==
                                                                          (h = fe())
                                                                          ? (c = [
                                                                              c,
                                                                              h
                                                                            ])
                                                                          : ((c = null),
                                                                            (i = y)),
                                                                        null !==
                                                                        (c =
                                                                          null !==
                                                                          c
                                                                            ? c
                                                                            : '')
                                                                          ? ('::' ===
                                                                            n.substr(
                                                                              i,
                                                                              2
                                                                            )
                                                                              ? ((h =
                                                                                  '::'),
                                                                                (i += 2))
                                                                              : ((h = null),
                                                                                0 ===
                                                                                  o &&
                                                                                  a(
                                                                                    '"::"'
                                                                                  )),
                                                                            null !==
                                                                            h
                                                                              ? (e = [
                                                                                  e,
                                                                                  t,
                                                                                  r,
                                                                                  s,
                                                                                  l,
                                                                                  u,
                                                                                  c,
                                                                                  h
                                                                                ])
                                                                              : ((e = null),
                                                                                (i = g)))
                                                                          : ((e = null),
                                                                            (i = g)))
                                                                      : ((e = null),
                                                                        (i = g)))
                                                                  : ((e = null),
                                                                    (i = g)))
                                                              : ((e = null),
                                                                (i = g)))
                                                          : ((e = null),
                                                            (i = g)))
                                                      : ((e = null), (i = g)))
                                                  : ((e = null),
                                                    (i = g)))))))))))))))),
                    null !== e &&
                      ((T = v),
                      (jn.host_type = 'IPv6'),
                      (e = n.substring(i, T))),
                    null === e && (i = v),
                    e
                  )
                }
                function fe () {
                  var e, t, n, r, s
                  return (
                    (s = i),
                    null !== (e = f()) &&
                    null !== (t = null !== (t = f()) ? t : '') &&
                    null !== (n = null !== (n = f()) ? n : '') &&
                    null !== (r = null !== (r = f()) ? r : '')
                      ? (e = [e, t, n, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function _e () {
                  var e, t, r, s
                  return (
                    (s = i),
                    null !== (e = fe())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t && null !== (r = fe())
                          ? (e = [e, t, r])
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null === e && (e = pe()),
                    e
                  )
                }
                function pe () {
                  var e, t, r, s, l, u, c, h, d, f
                  return (
                    (h = i),
                    (d = i),
                    null !== (e = me())
                      ? (46 === n.charCodeAt(i)
                          ? ((t = '.'), i++)
                          : ((t = null), 0 === o && a('"."')),
                        null !== t && null !== (r = me())
                          ? (46 === n.charCodeAt(i)
                              ? ((s = '.'), i++)
                              : ((s = null), 0 === o && a('"."')),
                            null !== s && null !== (l = me())
                              ? (46 === n.charCodeAt(i)
                                  ? ((u = '.'), i++)
                                  : ((u = null), 0 === o && a('"."')),
                                null !== u && null !== (c = me())
                                  ? (e = [e, t, r, s, l, u, c])
                                  : ((e = null), (i = d)))
                              : ((e = null), (i = d)))
                          : ((e = null), (i = d)))
                      : ((e = null), (i = d)),
                    null !== e &&
                      ((f = h),
                      (jn.host_type = 'IPv4'),
                      (e = n.substring(i, f))),
                    null === e && (i = h),
                    e
                  )
                }
                function me () {
                  var e, t, r, s
                  return (
                    (s = i),
                    '25' === n.substr(i, 2)
                      ? ((e = '25'), (i += 2))
                      : ((e = null), 0 === o && a('"25"')),
                    null !== e
                      ? (/^[0-5]/.test(n.charAt(i))
                          ? ((t = n.charAt(i)), i++)
                          : ((t = null), 0 === o && a('[0-5]')),
                        null !== t ? (e = [e, t]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null === e &&
                      ((s = i),
                      50 === n.charCodeAt(i)
                        ? ((e = '2'), i++)
                        : ((e = null), 0 === o && a('"2"')),
                      null !== e
                        ? (/^[0-4]/.test(n.charAt(i))
                            ? ((t = n.charAt(i)), i++)
                            : ((t = null), 0 === o && a('[0-4]')),
                          null !== t && null !== (r = h())
                            ? (e = [e, t, r])
                            : ((e = null), (i = s)))
                        : ((e = null), (i = s)),
                      null === e &&
                        ((s = i),
                        49 === n.charCodeAt(i)
                          ? ((e = '1'), i++)
                          : ((e = null), 0 === o && a('"1"')),
                        null !== e && null !== (t = h()) && null !== (r = h())
                          ? (e = [e, t, r])
                          : ((e = null), (i = s)),
                        null === e &&
                          ((s = i),
                          /^[1-9]/.test(n.charAt(i))
                            ? ((e = n.charAt(i)), i++)
                            : ((e = null), 0 === o && a('[1-9]')),
                          null !== e && null !== (t = h())
                            ? (e = [e, t])
                            : ((e = null), (i = s)),
                          null === e && (e = h())))),
                    e
                  )
                }
                function ve () {
                  var e, t, n, r, s, o, l, u
                  return (
                    (o = i),
                    (l = i),
                    null !== (e = null !== (e = h()) ? e : '') &&
                    null !== (t = null !== (t = h()) ? t : '') &&
                    null !== (n = null !== (n = h()) ? n : '') &&
                    null !== (r = null !== (r = h()) ? r : '') &&
                    null !== (s = null !== (s = h()) ? s : '')
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e),
                      (u = parseInt(u.join(''))),
                      (jn.port = u),
                      (e = u)),
                    null === e && (i = o),
                    e
                  )
                }
                function ge () {
                  var e, t, r, s
                  for (
                    e = [],
                      s = i,
                      59 === n.charCodeAt(i)
                        ? ((t = ';'), i++)
                        : ((t = null), 0 === o && a('";"')),
                      null !== t && null !== (r = ye())
                        ? (t = [t, r])
                        : ((t = null), (i = s));
                    null !== t;

                  )
                    e.push(t),
                      (s = i),
                      59 === n.charCodeAt(i)
                        ? ((t = ';'), i++)
                        : ((t = null), 0 === o && a('";"')),
                      null !== t && null !== (r = ye())
                        ? (t = [t, r])
                        : ((t = null), (i = s))
                  return e
                }
                function ye () {
                  var e
                  return (
                    null === (e = Te()) &&
                      null === (e = Ce()) &&
                      null === (e = be()) &&
                      null === (e = Se()) &&
                      null === (e = Ee()) &&
                      null === (e = Ae()) &&
                      (e = Re()),
                    e
                  )
                }
                function Te () {
                  var e, t, r, s, l
                  return (
                    (r = i),
                    (s = i),
                    'transport=' === n.substr(i, 10).toLowerCase()
                      ? ((e = n.substr(i, 10)), (i += 10))
                      : ((e = null), 0 === o && a('"transport="')),
                    null !== e
                      ? ('udp' === n.substr(i, 3).toLowerCase()
                          ? ((t = n.substr(i, 3)), (i += 3))
                          : ((t = null), 0 === o && a('"udp"')),
                        null === t &&
                          ('tcp' === n.substr(i, 3).toLowerCase()
                            ? ((t = n.substr(i, 3)), (i += 3))
                            : ((t = null), 0 === o && a('"tcp"')),
                          null === t &&
                            ('sctp' === n.substr(i, 4).toLowerCase()
                              ? ((t = n.substr(i, 4)), (i += 4))
                              : ((t = null), 0 === o && a('"sctp"')),
                            null === t &&
                              ('tls' === n.substr(i, 3).toLowerCase()
                                ? ((t = n.substr(i, 3)), (i += 3))
                                : ((t = null), 0 === o && a('"tls"')),
                              null === t && (t = N())))),
                        null !== t ? (e = [e, t]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[1]),
                      jn.uri_params || (jn.uri_params = {}),
                      (e = void (jn.uri_params.transport = l.toLowerCase()))),
                    null === e && (i = r),
                    e
                  )
                }
                function Ce () {
                  var e, t, r, s, l
                  return (
                    (r = i),
                    (s = i),
                    'user=' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"user="')),
                    null !== e
                      ? ('phone' === n.substr(i, 5).toLowerCase()
                          ? ((t = n.substr(i, 5)), (i += 5))
                          : ((t = null), 0 === o && a('"phone"')),
                        null === t &&
                          ('ip' === n.substr(i, 2).toLowerCase()
                            ? ((t = n.substr(i, 2)), (i += 2))
                            : ((t = null), 0 === o && a('"ip"')),
                          null === t && (t = N())),
                        null !== t ? (e = [e, t]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[1]),
                      jn.uri_params || (jn.uri_params = {}),
                      (e = void (jn.uri_params.user = l.toLowerCase()))),
                    null === e && (i = r),
                    e
                  )
                }
                function be () {
                  var e, t, r, s, l
                  return (
                    (r = i),
                    (s = i),
                    'method=' === n.substr(i, 7).toLowerCase()
                      ? ((e = n.substr(i, 7)), (i += 7))
                      : ((e = null), 0 === o && a('"method="')),
                    null !== e && null !== (t = ct())
                      ? (e = [e, t])
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[1]),
                      jn.uri_params || (jn.uri_params = {}),
                      (e = void (jn.uri_params.method = l))),
                    null === e && (i = r),
                    e
                  )
                }
                function Se () {
                  var e, t, r, s, l
                  return (
                    (r = i),
                    (s = i),
                    'ttl=' === n.substr(i, 4).toLowerCase()
                      ? ((e = n.substr(i, 4)), (i += 4))
                      : ((e = null), 0 === o && a('"ttl="')),
                    null !== e && null !== (t = An())
                      ? (e = [e, t])
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[1]),
                      jn.params || (jn.params = {}),
                      (e = void (jn.params.ttl = l))),
                    null === e && (i = r),
                    e
                  )
                }
                function Ee () {
                  var e, t, r, s, l
                  return (
                    (r = i),
                    (s = i),
                    'maddr=' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"maddr="')),
                    null !== e && null !== (t = le())
                      ? (e = [e, t])
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[1]),
                      jn.uri_params || (jn.uri_params = {}),
                      (e = void (jn.uri_params.maddr = l))),
                    null === e && (i = r),
                    e
                  )
                }
                function Ae () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'lr' === n.substr(i, 2).toLowerCase()
                      ? ((e = n.substr(i, 2)), (i += 2))
                      : ((e = null), 0 === o && a('"lr"')),
                    null !== e
                      ? ((u = i),
                        61 === n.charCodeAt(i)
                          ? ((t = '='), i++)
                          : ((t = null), 0 === o && a('"="')),
                        null !== t && null !== (r = N())
                          ? (t = [t, r])
                          : ((t = null), (i = u)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      (jn.uri_params || (jn.uri_params = {}),
                      (e = void (jn.uri_params.lr = void 0))),
                    null === e && (i = s),
                    e
                  )
                }
                function Re () {
                  var e, t, r, s, l, u, c, h
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = we())
                      ? ((u = i),
                        61 === n.charCodeAt(i)
                          ? ((t = '='), i++)
                          : ((t = null), 0 === o && a('"="')),
                        null !== t && null !== (r = Ie())
                          ? (t = [t, r])
                          : ((t = null), (i = u)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((c = e[0]),
                      (h = e[1]),
                      jn.uri_params || (jn.uri_params = {}),
                      (h = void 0 === h ? void 0 : h[1]),
                      (e = void (jn.uri_params[c.toLowerCase()] = h))),
                    null === e && (i = s),
                    e
                  )
                }
                function we () {
                  var e, t, n
                  if (((n = i), null !== (t = Oe())))
                    for (e = []; null !== t; ) e.push(t), (t = Oe())
                  else e = null
                  return (
                    null !== e && (e = e.join('')), null === e && (i = n), e
                  )
                }
                function Ie () {
                  var e, t, n
                  if (((n = i), null !== (t = Oe())))
                    for (e = []; null !== t; ) e.push(t), (t = Oe())
                  else e = null
                  return (
                    null !== e && (e = e.join('')), null === e && (i = n), e
                  )
                }
                function Oe () {
                  var e
                  return (
                    null === (e = ke()) && null === (e = C()) && (e = S()), e
                  )
                }
                function ke () {
                  var e
                  return (
                    91 === n.charCodeAt(i)
                      ? ((e = '['), i++)
                      : ((e = null), 0 === o && a('"["')),
                    null === e &&
                      (93 === n.charCodeAt(i)
                        ? ((e = ']'), i++)
                        : ((e = null), 0 === o && a('"]"')),
                      null === e &&
                        (47 === n.charCodeAt(i)
                          ? ((e = '/'), i++)
                          : ((e = null), 0 === o && a('"/"')),
                        null === e &&
                          (58 === n.charCodeAt(i)
                            ? ((e = ':'), i++)
                            : ((e = null), 0 === o && a('":"')),
                          null === e &&
                            (38 === n.charCodeAt(i)
                              ? ((e = '&'), i++)
                              : ((e = null), 0 === o && a('"&"')),
                            null === e &&
                              (43 === n.charCodeAt(i)
                                ? ((e = '+'), i++)
                                : ((e = null), 0 === o && a('"+"')),
                              null === e &&
                                (36 === n.charCodeAt(i)
                                  ? ((e = '$'), i++)
                                  : ((e = null), 0 === o && a('"$"')))))))),
                    e
                  )
                }
                function Ne () {
                  var e, t, r, s, l, u, c
                  if (
                    ((u = i),
                    63 === n.charCodeAt(i)
                      ? ((e = '?'), i++)
                      : ((e = null), 0 === o && a('"?"')),
                    null !== e)
                  )
                    if (null !== (t = Ue())) {
                      for (
                        r = [],
                          c = i,
                          38 === n.charCodeAt(i)
                            ? ((s = '&'), i++)
                            : ((s = null), 0 === o && a('"&"')),
                          null !== s && null !== (l = Ue())
                            ? (s = [s, l])
                            : ((s = null), (i = c));
                        null !== s;

                      )
                        r.push(s),
                          (c = i),
                          38 === n.charCodeAt(i)
                            ? ((s = '&'), i++)
                            : ((s = null), 0 === o && a('"&"')),
                          null !== s && null !== (l = Ue())
                            ? (s = [s, l])
                            : ((s = null), (i = c))
                      null !== r ? (e = [e, t, r]) : ((e = null), (i = u))
                    } else (e = null), (i = u)
                  else (e = null), (i = u)
                  return e
                }
                function Ue () {
                  var e, t, r, s, l, u, c
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = De())
                      ? (61 === n.charCodeAt(i)
                          ? ((t = '='), i++)
                          : ((t = null), 0 === o && a('"="')),
                        null !== t && null !== (r = xe())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e[0]),
                      (c = e[2]),
                      (u = u.join('').toLowerCase()),
                      (c = c.join('')),
                      jn.uri_headers || (jn.uri_headers = {}),
                      (e = void (jn.uri_headers[u]
                        ? jn.uri_headers[u].push(c)
                        : (jn.uri_headers[u] = [c])))),
                    null === e && (i = s),
                    e
                  )
                }
                function De () {
                  var e, t
                  if (
                    (null === (t = Pe()) && null === (t = C()) && (t = S()),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = Pe()) && null === (t = C()) && (t = S())
                  else e = null
                  return e
                }
                function xe () {
                  var e, t
                  for (
                    e = [],
                      null === (t = Pe()) && null === (t = C()) && (t = S());
                    null !== t;

                  )
                    e.push(t),
                      null === (t = Pe()) && null === (t = C()) && (t = S())
                  return e
                }
                function Pe () {
                  var e
                  return (
                    91 === n.charCodeAt(i)
                      ? ((e = '['), i++)
                      : ((e = null), 0 === o && a('"["')),
                    null === e &&
                      (93 === n.charCodeAt(i)
                        ? ((e = ']'), i++)
                        : ((e = null), 0 === o && a('"]"')),
                      null === e &&
                        (47 === n.charCodeAt(i)
                          ? ((e = '/'), i++)
                          : ((e = null), 0 === o && a('"/"')),
                        null === e &&
                          (63 === n.charCodeAt(i)
                            ? ((e = '?'), i++)
                            : ((e = null), 0 === o && a('"?"')),
                          null === e &&
                            (58 === n.charCodeAt(i)
                              ? ((e = ':'), i++)
                              : ((e = null), 0 === o && a('":"')),
                            null === e &&
                              (43 === n.charCodeAt(i)
                                ? ((e = '+'), i++)
                                : ((e = null), 0 === o && a('"+"')),
                              null === e &&
                                (36 === n.charCodeAt(i)
                                  ? ((e = '$'), i++)
                                  : ((e = null), 0 === o && a('"$"')))))))),
                    e
                  )
                }
                function Me () {
                  var e, t, n, r, s, o
                  return (
                    (o = i),
                    null !== (e = ct()) &&
                    null !== (t = v()) &&
                    null !== (n = qe()) &&
                    null !== (r = v()) &&
                    null !== (s = et())
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = o)),
                    e
                  )
                }
                function qe () {
                  var e
                  return null === (e = Q()) && (e = Le()), e
                }
                function Le () {
                  var e, t, r, s
                  return (
                    (s = i),
                    null !== (e = $e())
                      ? (58 === n.charCodeAt(i)
                          ? ((t = ':'), i++)
                          : ((t = null), 0 === o && a('":"')),
                        null !== t
                          ? (null === (r = He()) && (r = Ge()),
                            null !== r
                              ? (e = [e, t, r])
                              : ((e = null), (i = s)))
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function He () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    null === (e = Fe()) && (e = je()),
                    null !== e
                      ? ((l = i),
                        63 === n.charCodeAt(i)
                          ? ((t = '?'), i++)
                          : ((t = null), 0 === o && a('"?"')),
                        null !== t && null !== (r = Ze())
                          ? (t = [t, r])
                          : ((t = null), (i = l)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function Fe () {
                  var e, t, r, s
                  return (
                    (s = i),
                    '//' === n.substr(i, 2)
                      ? ((e = '//'), (i += 2))
                      : ((e = null), 0 === o && a('"//"')),
                    null !== e &&
                    null !== (t = Xe()) &&
                    null !== (r = null !== (r = je()) ? r : '')
                      ? (e = [e, t, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function je () {
                  var e, t, r
                  return (
                    (r = i),
                    47 === n.charCodeAt(i)
                      ? ((e = '/'), i++)
                      : ((e = null), 0 === o && a('"/"')),
                    null !== e && null !== (t = Be())
                      ? (e = [e, t])
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function Ge () {
                  var e, t, n, r
                  if (((r = i), null !== (e = Ve()))) {
                    for (t = [], n = We(); null !== n; ) t.push(n), (n = We())
                    null !== t ? (e = [e, t]) : ((e = null), (i = r))
                  } else (e = null), (i = r)
                  return e
                }
                function We () {
                  var e
                  return (
                    null === (e = T()) && null === (e = C()) && (e = S()), e
                  )
                }
                function Ve () {
                  var e
                  return (
                    null === (e = C()) &&
                      null === (e = S()) &&
                      (59 === n.charCodeAt(i)
                        ? ((e = ';'), i++)
                        : ((e = null), 0 === o && a('";"')),
                      null === e &&
                        (63 === n.charCodeAt(i)
                          ? ((e = '?'), i++)
                          : ((e = null), 0 === o && a('"?"')),
                        null === e &&
                          (58 === n.charCodeAt(i)
                            ? ((e = ':'), i++)
                            : ((e = null), 0 === o && a('":"')),
                          null === e &&
                            (64 === n.charCodeAt(i)
                              ? ((e = '@'), i++)
                              : ((e = null), 0 === o && a('"@"')),
                            null === e &&
                              (38 === n.charCodeAt(i)
                                ? ((e = '&'), i++)
                                : ((e = null), 0 === o && a('"&"')),
                              null === e &&
                                (61 === n.charCodeAt(i)
                                  ? ((e = '='), i++)
                                  : ((e = null), 0 === o && a('"="')),
                                null === e &&
                                  (43 === n.charCodeAt(i)
                                    ? ((e = '+'), i++)
                                    : ((e = null), 0 === o && a('"+"')),
                                  null === e &&
                                    (36 === n.charCodeAt(i)
                                      ? ((e = '$'), i++)
                                      : ((e = null), 0 === o && a('"$"')),
                                    null === e &&
                                      (44 === n.charCodeAt(i)
                                        ? ((e = ','), i++)
                                        : ((e = null),
                                          0 === o && a('","'))))))))))),
                    e
                  )
                }
                function Be () {
                  var e, t, r, s, l, u
                  if (((l = i), null !== (e = Ke()))) {
                    for (
                      t = [],
                        u = i,
                        47 === n.charCodeAt(i)
                          ? ((r = '/'), i++)
                          : ((r = null), 0 === o && a('"/"')),
                        null !== r && null !== (s = Ke())
                          ? (r = [r, s])
                          : ((r = null), (i = u));
                      null !== r;

                    )
                      t.push(r),
                        (u = i),
                        47 === n.charCodeAt(i)
                          ? ((r = '/'), i++)
                          : ((r = null), 0 === o && a('"/"')),
                        null !== r && null !== (s = Ke())
                          ? (r = [r, s])
                          : ((r = null), (i = u))
                    null !== t ? (e = [e, t]) : ((e = null), (i = l))
                  } else (e = null), (i = l)
                  return e
                }
                function Ke () {
                  var e, t, r, s, l, u
                  for (l = i, e = [], t = Ye(); null !== t; )
                    e.push(t), (t = Ye())
                  if (null !== e) {
                    for (
                      t = [],
                        u = i,
                        59 === n.charCodeAt(i)
                          ? ((r = ';'), i++)
                          : ((r = null), 0 === o && a('";"')),
                        null !== r && null !== (s = ze())
                          ? (r = [r, s])
                          : ((r = null), (i = u));
                      null !== r;

                    )
                      t.push(r),
                        (u = i),
                        59 === n.charCodeAt(i)
                          ? ((r = ';'), i++)
                          : ((r = null), 0 === o && a('";"')),
                        null !== r && null !== (s = ze())
                          ? (r = [r, s])
                          : ((r = null), (i = u))
                    null !== t ? (e = [e, t]) : ((e = null), (i = l))
                  } else (e = null), (i = l)
                  return e
                }
                function ze () {
                  var e, t
                  for (e = [], t = Ye(); null !== t; ) e.push(t), (t = Ye())
                  return e
                }
                function Ye () {
                  var e
                  return (
                    null === (e = C()) &&
                      null === (e = S()) &&
                      (58 === n.charCodeAt(i)
                        ? ((e = ':'), i++)
                        : ((e = null), 0 === o && a('":"')),
                      null === e &&
                        (64 === n.charCodeAt(i)
                          ? ((e = '@'), i++)
                          : ((e = null), 0 === o && a('"@"')),
                        null === e &&
                          (38 === n.charCodeAt(i)
                            ? ((e = '&'), i++)
                            : ((e = null), 0 === o && a('"&"')),
                          null === e &&
                            (61 === n.charCodeAt(i)
                              ? ((e = '='), i++)
                              : ((e = null), 0 === o && a('"="')),
                            null === e &&
                              (43 === n.charCodeAt(i)
                                ? ((e = '+'), i++)
                                : ((e = null), 0 === o && a('"+"')),
                              null === e &&
                                (36 === n.charCodeAt(i)
                                  ? ((e = '$'), i++)
                                  : ((e = null), 0 === o && a('"$"')),
                                null === e &&
                                  (44 === n.charCodeAt(i)
                                    ? ((e = ','), i++)
                                    : ((e = null), 0 === o && a('","'))))))))),
                    e
                  )
                }
                function $e () {
                  var e, t, r, s, l, u
                  if (((s = i), (l = i), null !== (e = d()))) {
                    for (
                      t = [],
                        null === (r = d()) &&
                          null === (r = h()) &&
                          (43 === n.charCodeAt(i)
                            ? ((r = '+'), i++)
                            : ((r = null), 0 === o && a('"+"')),
                          null === r &&
                            (45 === n.charCodeAt(i)
                              ? ((r = '-'), i++)
                              : ((r = null), 0 === o && a('"-"')),
                            null === r &&
                              (46 === n.charCodeAt(i)
                                ? ((r = '.'), i++)
                                : ((r = null), 0 === o && a('"."')))));
                      null !== r;

                    )
                      t.push(r),
                        null === (r = d()) &&
                          null === (r = h()) &&
                          (43 === n.charCodeAt(i)
                            ? ((r = '+'), i++)
                            : ((r = null), 0 === o && a('"+"')),
                          null === r &&
                            (45 === n.charCodeAt(i)
                              ? ((r = '-'), i++)
                              : ((r = null), 0 === o && a('"-"')),
                            null === r &&
                              (46 === n.charCodeAt(i)
                                ? ((r = '.'), i++)
                                : ((r = null), 0 === o && a('"."')))))
                    null !== t ? (e = [e, t]) : ((e = null), (i = l))
                  } else (e = null), (i = l)
                  return (
                    null !== e &&
                      ((u = s), (e = void (jn.scheme = n.substring(i, u)))),
                    null === e && (i = s),
                    e
                  )
                }
                function Xe () {
                  var e
                  return null === (e = Je()) && (e = Qe()), e
                }
                function Je () {
                  var e, t, r, s
                  return (
                    (r = i),
                    (s = i),
                    null !== (e = ne())
                      ? (64 === n.charCodeAt(i)
                          ? ((t = '@'), i++)
                          : ((t = null), 0 === o && a('"@"')),
                        null !== t ? (e = [e, t]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null !== (e = null !== e ? e : '') && null !== (t = oe())
                      ? (e = [e, t])
                      : ((e = null), (i = r)),
                    (e = null !== e ? e : '')
                  )
                }
                function Qe () {
                  var e, t
                  if (
                    (null === (t = C()) &&
                      null === (t = S()) &&
                      (36 === n.charCodeAt(i)
                        ? ((t = '$'), i++)
                        : ((t = null), 0 === o && a('"$"')),
                      null === t &&
                        (44 === n.charCodeAt(i)
                          ? ((t = ','), i++)
                          : ((t = null), 0 === o && a('","')),
                        null === t &&
                          (59 === n.charCodeAt(i)
                            ? ((t = ';'), i++)
                            : ((t = null), 0 === o && a('";"')),
                          null === t &&
                            (58 === n.charCodeAt(i)
                              ? ((t = ':'), i++)
                              : ((t = null), 0 === o && a('":"')),
                            null === t &&
                              (64 === n.charCodeAt(i)
                                ? ((t = '@'), i++)
                                : ((t = null), 0 === o && a('"@"')),
                              null === t &&
                                (38 === n.charCodeAt(i)
                                  ? ((t = '&'), i++)
                                  : ((t = null), 0 === o && a('"&"')),
                                null === t &&
                                  (61 === n.charCodeAt(i)
                                    ? ((t = '='), i++)
                                    : ((t = null), 0 === o && a('"="')),
                                  null === t &&
                                    (43 === n.charCodeAt(i)
                                      ? ((t = '+'), i++)
                                      : ((t = null),
                                        0 === o && a('"+"')))))))))),
                    null !== t)
                  )
                    for (e = []; null !== t; )
                      e.push(t),
                        null === (t = C()) &&
                          null === (t = S()) &&
                          (36 === n.charCodeAt(i)
                            ? ((t = '$'), i++)
                            : ((t = null), 0 === o && a('"$"')),
                          null === t &&
                            (44 === n.charCodeAt(i)
                              ? ((t = ','), i++)
                              : ((t = null), 0 === o && a('","')),
                            null === t &&
                              (59 === n.charCodeAt(i)
                                ? ((t = ';'), i++)
                                : ((t = null), 0 === o && a('";"')),
                              null === t &&
                                (58 === n.charCodeAt(i)
                                  ? ((t = ':'), i++)
                                  : ((t = null), 0 === o && a('":"')),
                                null === t &&
                                  (64 === n.charCodeAt(i)
                                    ? ((t = '@'), i++)
                                    : ((t = null), 0 === o && a('"@"')),
                                  null === t &&
                                    (38 === n.charCodeAt(i)
                                      ? ((t = '&'), i++)
                                      : ((t = null), 0 === o && a('"&"')),
                                    null === t &&
                                      (61 === n.charCodeAt(i)
                                        ? ((t = '='), i++)
                                        : ((t = null), 0 === o && a('"="')),
                                      null === t &&
                                        (43 === n.charCodeAt(i)
                                          ? ((t = '+'), i++)
                                          : ((t = null),
                                            0 === o && a('"+"'))))))))))
                  else e = null
                  return e
                }
                function Ze () {
                  var e, t
                  for (e = [], t = We(); null !== t; ) e.push(t), (t = We())
                  return e
                }
                function et () {
                  var e, t, r, s, l, u, c, d, f
                  if (
                    ((c = i),
                    (d = i),
                    'sip' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"SIP"')),
                    null !== e)
                  )
                    if (
                      (47 === n.charCodeAt(i)
                        ? ((t = '/'), i++)
                        : ((t = null), 0 === o && a('"/"')),
                      null !== t)
                    ) {
                      if (null !== (s = h()))
                        for (r = []; null !== s; ) r.push(s), (s = h())
                      else r = null
                      if (null !== r)
                        if (
                          (46 === n.charCodeAt(i)
                            ? ((s = '.'), i++)
                            : ((s = null), 0 === o && a('"."')),
                          null !== s)
                        ) {
                          if (null !== (u = h()))
                            for (l = []; null !== u; ) l.push(u), (u = h())
                          else l = null
                          null !== l
                            ? (e = [e, t, r, s, l])
                            : ((e = null), (i = d))
                        } else (e = null), (i = d)
                      else (e = null), (i = d)
                    } else (e = null), (i = d)
                  else (e = null), (i = d)
                  return (
                    null !== e &&
                      ((f = c),
                      (e = void (jn.sip_version = n.substring(i, f)))),
                    null === e && (i = c),
                    e
                  )
                }
                function tt () {
                  var e
                  return (
                    'INVITE' === n.substr(i, 6)
                      ? ((e = 'INVITE'), (i += 6))
                      : ((e = null), 0 === o && a('"INVITE"')),
                    e
                  )
                }
                function nt () {
                  var e
                  return (
                    'ACK' === n.substr(i, 3)
                      ? ((e = 'ACK'), (i += 3))
                      : ((e = null), 0 === o && a('"ACK"')),
                    e
                  )
                }
                function rt () {
                  var e
                  return (
                    'OPTIONS' === n.substr(i, 7)
                      ? ((e = 'OPTIONS'), (i += 7))
                      : ((e = null), 0 === o && a('"OPTIONS"')),
                    e
                  )
                }
                function st () {
                  var e
                  return (
                    'BYE' === n.substr(i, 3)
                      ? ((e = 'BYE'), (i += 3))
                      : ((e = null), 0 === o && a('"BYE"')),
                    e
                  )
                }
                function it () {
                  var e
                  return (
                    'CANCEL' === n.substr(i, 6)
                      ? ((e = 'CANCEL'), (i += 6))
                      : ((e = null), 0 === o && a('"CANCEL"')),
                    e
                  )
                }
                function ot () {
                  var e
                  return (
                    'REGISTER' === n.substr(i, 8)
                      ? ((e = 'REGISTER'), (i += 8))
                      : ((e = null), 0 === o && a('"REGISTER"')),
                    e
                  )
                }
                function lt () {
                  var e
                  return (
                    'SUBSCRIBE' === n.substr(i, 9)
                      ? ((e = 'SUBSCRIBE'), (i += 9))
                      : ((e = null), 0 === o && a('"SUBSCRIBE"')),
                    e
                  )
                }
                function ut () {
                  var e
                  return (
                    'NOTIFY' === n.substr(i, 6)
                      ? ((e = 'NOTIFY'), (i += 6))
                      : ((e = null), 0 === o && a('"NOTIFY"')),
                    e
                  )
                }
                function at () {
                  var e
                  return (
                    'REFER' === n.substr(i, 5)
                      ? ((e = 'REFER'), (i += 5))
                      : ((e = null), 0 === o && a('"REFER"')),
                    e
                  )
                }
                function ct () {
                  var e, t, r
                  return (
                    (t = i),
                    null === (e = tt()) &&
                      null === (e = nt()) &&
                      null === (e = rt()) &&
                      null === (e = st()) &&
                      null === (e = it()) &&
                      null === (e = ot()) &&
                      null === (e = lt()) &&
                      null === (e = ut()) &&
                      null === (e = at()) &&
                      (e = N()),
                    null !== e &&
                      ((r = t),
                      (jn.method = n.substring(i, r)),
                      (e = jn.method)),
                    null === e && (i = t),
                    e
                  )
                }
                function ht () {
                  var e, t, n, r, s, o
                  return (
                    (o = i),
                    null !== (e = et()) &&
                    null !== (t = v()) &&
                    null !== (n = dt()) &&
                    null !== (r = v()) &&
                    null !== (s = _t())
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = o)),
                    e
                  )
                }
                function dt () {
                  var e, t, n
                  return (
                    (t = i),
                    null !== (e = ft()) &&
                      ((n = e),
                      (e = void (jn.status_code = parseInt(n.join(''))))),
                    null === e && (i = t),
                    e
                  )
                }
                function ft () {
                  var e, t, n, r
                  return (
                    (r = i),
                    null !== (e = h()) &&
                    null !== (t = h()) &&
                    null !== (n = h())
                      ? (e = [e, t, n])
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function _t () {
                  var e, t, r, s
                  for (
                    r = i,
                      e = [],
                      null === (t = T()) &&
                        null === (t = C()) &&
                        null === (t = S()) &&
                        null === (t = O()) &&
                        null === (t = k()) &&
                        null === (t = v()) &&
                        (t = g());
                    null !== t;

                  )
                    e.push(t),
                      null === (t = T()) &&
                        null === (t = C()) &&
                        null === (t = S()) &&
                        null === (t = O()) &&
                        null === (t = k()) &&
                        null === (t = v()) &&
                        (t = g())
                  return (
                    null !== e &&
                      ((s = r),
                      (e = void (jn.reason_phrase = n.substring(i, s)))),
                    null === e && (i = r),
                    e
                  )
                }
                function pt () {
                  var e, t, n, r, s, o, l
                  if (
                    ((s = i),
                    (o = i),
                    null === (e = J()) && (e = mt()),
                    null !== e)
                  ) {
                    for (
                      t = [],
                        l = i,
                        null !== (n = G()) && null !== (r = gt())
                          ? (n = [n, r])
                          : ((n = null), (i = l));
                      null !== n;

                    )
                      t.push(n),
                        (l = i),
                        null !== (n = G()) && null !== (r = gt())
                          ? (n = [n, r])
                          : ((n = null), (i = l))
                    null !== t ? (e = [e, t]) : ((e = null), (i = o))
                  } else (e = null), (i = o)
                  return (
                    null !== e &&
                      (e = (function (e) {
                        var t
                        jn.multi_header || (jn.multi_header = [])
                        try {
                          ;(t = new Fn(jn.uri, jn.display_name, jn.params)),
                            delete jn.uri,
                            delete jn.display_name,
                            delete jn.params
                        } catch (e) {
                          t = null
                        }
                        jn.multi_header.push({
                          possition: i,
                          offset: e,
                          parsed: t
                        })
                      })(s)),
                    null === e && (i = s),
                    e
                  )
                }
                function mt () {
                  var e, t, n, r, s
                  return (
                    (s = i),
                    null !== (e = null !== (e = vt()) ? e : '') &&
                    null !== (t = F()) &&
                    null !== (n = Q()) &&
                    null !== (r = H())
                      ? (e = [e, t, n, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function vt () {
                  var e, t, n, r, s, o, l, u
                  if (((s = i), (o = i), null !== (e = N()))) {
                    for (
                      t = [],
                        l = i,
                        null !== (n = E()) && null !== (r = N())
                          ? (n = [n, r])
                          : ((n = null), (i = l));
                      null !== n;

                    )
                      t.push(n),
                        (l = i),
                        null !== (n = E()) && null !== (r = N())
                          ? (n = [n, r])
                          : ((n = null), (i = l))
                    null !== t ? (e = [e, t]) : ((e = null), (i = o))
                  } else (e = null), (i = o)
                  return (
                    null === e && (e = Y()),
                    null !== e &&
                      ((u = e),
                      (e = void (jn.display_name =
                        'string' == typeof u
                          ? u
                          : u[1].reduce(function (e, t) {
                              return e + t[0] + t[1]
                            }, u[0])))),
                    null === e && (i = s),
                    e
                  )
                }
                function gt () {
                  var e
                  return (
                    null === (e = yt()) && null === (e = Tt()) && (e = St()), e
                  )
                }
                function yt () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'q' === n.substr(i, 1).toLowerCase()
                      ? ((e = n.substr(i, 1)), i++)
                      : ((e = null), 0 === o && a('"q"')),
                    null !== e && null !== (t = M()) && null !== (r = bt())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e[2]),
                      jn.params || (jn.params = {}),
                      (e = void (jn.params.q = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function Tt () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'expires' === n.substr(i, 7).toLowerCase()
                      ? ((e = n.substr(i, 7)), (i += 7))
                      : ((e = null), 0 === o && a('"expires"')),
                    null !== e && null !== (t = M()) && null !== (r = Ct())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e[2]),
                      jn.params || (jn.params = {}),
                      (e = void (jn.params.expires = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function Ct () {
                  var e, t, n
                  if (((n = i), null !== (t = h())))
                    for (e = []; null !== t; ) e.push(t), (t = h())
                  else e = null
                  return (
                    null !== e && (e = parseInt(e.join(''))),
                    null === e && (i = n),
                    e
                  )
                }
                function bt () {
                  var e, t, r, s, l, u, c, d, f
                  return (
                    (u = i),
                    (c = i),
                    48 === n.charCodeAt(i)
                      ? ((e = '0'), i++)
                      : ((e = null), 0 === o && a('"0"')),
                    null !== e
                      ? ((d = i),
                        46 === n.charCodeAt(i)
                          ? ((t = '.'), i++)
                          : ((t = null), 0 === o && a('"."')),
                        null !== t &&
                        null !== (r = null !== (r = h()) ? r : '') &&
                        null !== (s = null !== (s = h()) ? s : '') &&
                        null !== (l = null !== (l = h()) ? l : '')
                          ? (t = [t, r, s, l])
                          : ((t = null), (i = d)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = c)))
                      : ((e = null), (i = c)),
                    null !== e &&
                      ((f = u), (e = parseFloat(n.substring(i, f)))),
                    null === e && (i = u),
                    e
                  )
                }
                function St () {
                  var e, t, n, r, s, o, l, u
                  return (
                    (r = i),
                    (s = i),
                    null !== (e = N())
                      ? ((o = i),
                        null !== (t = M()) && null !== (n = Et())
                          ? (t = [t, n])
                          : ((t = null), (i = o)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    null !== e &&
                      ((l = e[0]),
                      (u = e[1]),
                      jn.params || (jn.params = {}),
                      (u = void 0 === u ? void 0 : u[1]),
                      (e = void (jn.params[l.toLowerCase()] = u))),
                    null === e && (i = r),
                    e
                  )
                }
                function Et () {
                  var e
                  return (
                    null === (e = N()) && null === (e = le()) && (e = z()), e
                  )
                }
                function At () {
                  var e
                  return (
                    'render' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"render"')),
                    null === e &&
                      ('session' === n.substr(i, 7).toLowerCase()
                        ? ((e = n.substr(i, 7)), (i += 7))
                        : ((e = null), 0 === o && a('"session"')),
                      null === e &&
                        ('icon' === n.substr(i, 4).toLowerCase()
                          ? ((e = n.substr(i, 4)), (i += 4))
                          : ((e = null), 0 === o && a('"icon"')),
                        null === e &&
                          ('alert' === n.substr(i, 5).toLowerCase()
                            ? ((e = n.substr(i, 5)), (i += 5))
                            : ((e = null), 0 === o && a('"alert"')),
                          null === e && (e = N())))),
                    e
                  )
                }
                function Rt () {
                  var e
                  return null === (e = wt()) && (e = St()), e
                }
                function wt () {
                  var e, t, r, s
                  return (
                    (s = i),
                    'handling' === n.substr(i, 8).toLowerCase()
                      ? ((e = n.substr(i, 8)), (i += 8))
                      : ((e = null), 0 === o && a('"handling"')),
                    null !== e && null !== (t = M())
                      ? ('optional' === n.substr(i, 8).toLowerCase()
                          ? ((r = n.substr(i, 8)), (i += 8))
                          : ((r = null), 0 === o && a('"optional"')),
                        null === r &&
                          ('required' === n.substr(i, 8).toLowerCase()
                            ? ((r = n.substr(i, 8)), (i += 8))
                            : ((r = null), 0 === o && a('"required"')),
                          null === r && (r = N())),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function It () {
                  var e, t, n, r, s, o, l, u
                  if (((l = i), null !== (e = Ot())))
                    if (null !== (t = P()))
                      if (null !== (n = xt())) {
                        for (
                          r = [],
                            u = i,
                            null !== (s = G()) && null !== (o = Pt())
                              ? (s = [s, o])
                              : ((s = null), (i = u));
                          null !== s;

                        )
                          r.push(s),
                            (u = i),
                            null !== (s = G()) && null !== (o = Pt())
                              ? (s = [s, o])
                              : ((s = null), (i = u))
                        null !== r ? (e = [e, t, n, r]) : ((e = null), (i = l))
                      } else (e = null), (i = l)
                    else (e = null), (i = l)
                  else (e = null), (i = l)
                  return e
                }
                function Ot () {
                  var e
                  return null === (e = kt()) && (e = Nt()), e
                }
                function kt () {
                  var e
                  return (
                    'text' === n.substr(i, 4).toLowerCase()
                      ? ((e = n.substr(i, 4)), (i += 4))
                      : ((e = null), 0 === o && a('"text"')),
                    null === e &&
                      ('image' === n.substr(i, 5).toLowerCase()
                        ? ((e = n.substr(i, 5)), (i += 5))
                        : ((e = null), 0 === o && a('"image"')),
                      null === e &&
                        ('audio' === n.substr(i, 5).toLowerCase()
                          ? ((e = n.substr(i, 5)), (i += 5))
                          : ((e = null), 0 === o && a('"audio"')),
                        null === e &&
                          ('video' === n.substr(i, 5).toLowerCase()
                            ? ((e = n.substr(i, 5)), (i += 5))
                            : ((e = null), 0 === o && a('"video"')),
                          null === e &&
                            ('application' === n.substr(i, 11).toLowerCase()
                              ? ((e = n.substr(i, 11)), (i += 11))
                              : ((e = null), 0 === o && a('"application"')),
                            null === e && (e = Ut()))))),
                    e
                  )
                }
                function Nt () {
                  var e
                  return (
                    'message' === n.substr(i, 7).toLowerCase()
                      ? ((e = n.substr(i, 7)), (i += 7))
                      : ((e = null), 0 === o && a('"message"')),
                    null === e &&
                      ('multipart' === n.substr(i, 9).toLowerCase()
                        ? ((e = n.substr(i, 9)), (i += 9))
                        : ((e = null), 0 === o && a('"multipart"')),
                      null === e && (e = Ut())),
                    e
                  )
                }
                function Ut () {
                  var e
                  return null === (e = N()) && (e = Dt()), e
                }
                function Dt () {
                  var e, t, r
                  return (
                    (r = i),
                    'x-' === n.substr(i, 2).toLowerCase()
                      ? ((e = n.substr(i, 2)), (i += 2))
                      : ((e = null), 0 === o && a('"x-"')),
                    null !== e && null !== (t = N())
                      ? (e = [e, t])
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function xt () {
                  var e
                  return null === (e = Ut()) && (e = N()), e
                }
                function Pt () {
                  var e, t, n, r
                  return (
                    (r = i),
                    null !== (e = N()) &&
                    null !== (t = M()) &&
                    null !== (n = Mt())
                      ? (e = [e, t, n])
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function Mt () {
                  var e
                  return null === (e = N()) && (e = z()), e
                }
                function qt () {
                  var e, t, n, r
                  if (((n = i), null !== (t = h())))
                    for (e = []; null !== t; ) e.push(t), (t = h())
                  else e = null
                  return (
                    null !== e &&
                      ((r = e), (e = void (jn.value = parseInt(r.join(''))))),
                    null === e && (i = n),
                    e
                  )
                }
                function Lt () {
                  var e, t, r, s, l, u
                  if (((l = i), null !== (e = U()))) {
                    for (
                      t = [],
                        u = i,
                        46 === n.charCodeAt(i)
                          ? ((r = '.'), i++)
                          : ((r = null), 0 === o && a('"."')),
                        null !== r && null !== (s = U())
                          ? (r = [r, s])
                          : ((r = null), (i = u));
                      null !== r;

                    )
                      t.push(r),
                        (u = i),
                        46 === n.charCodeAt(i)
                          ? ((r = '.'), i++)
                          : ((r = null), 0 === o && a('"."')),
                        null !== r && null !== (s = U())
                          ? (r = [r, s])
                          : ((r = null), (i = u))
                    null !== t ? (e = [e, t]) : ((e = null), (i = l))
                  } else (e = null), (i = l)
                  return e
                }
                function Ht () {
                  var e
                  return null === (e = Ft()) && (e = St()), e
                }
                function Ft () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'tag' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"tag"')),
                    null !== e && null !== (t = M()) && null !== (r = N())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.tag = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function jt () {
                  var e, t, r, s, l, u, c, h
                  if (
                    ((c = i),
                    'digest' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"Digest"')),
                    null !== e)
                  )
                    if (null !== (t = E()))
                      if (null !== (r = Vt())) {
                        for (
                          s = [],
                            h = i,
                            null !== (l = j()) && null !== (u = Vt())
                              ? (l = [l, u])
                              : ((l = null), (i = h));
                          null !== l;

                        )
                          s.push(l),
                            (h = i),
                            null !== (l = j()) && null !== (u = Vt())
                              ? (l = [l, u])
                              : ((l = null), (i = h))
                        null !== s ? (e = [e, t, r, s]) : ((e = null), (i = c))
                      } else (e = null), (i = c)
                    else (e = null), (i = c)
                  else (e = null), (i = c)
                  return null === e && (e = Gt()), e
                }
                function Gt () {
                  var e, t, n, r, s, o, l, u
                  if (((l = i), null !== (e = N())))
                    if (null !== (t = E()))
                      if (null !== (n = Wt())) {
                        for (
                          r = [],
                            u = i,
                            null !== (s = j()) && null !== (o = Wt())
                              ? (s = [s, o])
                              : ((s = null), (i = u));
                          null !== s;

                        )
                          r.push(s),
                            (u = i),
                            null !== (s = j()) && null !== (o = Wt())
                              ? (s = [s, o])
                              : ((s = null), (i = u))
                        null !== r ? (e = [e, t, n, r]) : ((e = null), (i = l))
                      } else (e = null), (i = l)
                    else (e = null), (i = l)
                  else (e = null), (i = l)
                  return e
                }
                function Wt () {
                  var e, t, n, r
                  return (
                    (r = i),
                    null !== (e = N()) && null !== (t = M())
                      ? (null === (n = N()) && (n = z()),
                        null !== n ? (e = [e, t, n]) : ((e = null), (i = r)))
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function Vt () {
                  var e
                  return (
                    null === (e = Bt()) &&
                      null === (e = zt()) &&
                      null === (e = $t()) &&
                      null === (e = Jt()) &&
                      null === (e = Qt()) &&
                      null === (e = Zt()) &&
                      null === (e = en()) &&
                      (e = Wt()),
                    e
                  )
                }
                function Bt () {
                  var e, t, r, s
                  return (
                    (s = i),
                    'realm' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"realm"')),
                    null !== e && null !== (t = M()) && null !== (r = Kt())
                      ? (e = [e, t, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function Kt () {
                  var e, t, n
                  return (
                    (t = i),
                    null !== (e = Y()) && ((n = e), (e = void (jn.realm = n))),
                    null === e && (i = t),
                    e
                  )
                }
                function zt () {
                  var e, t, r, s, l, u, c, h, d
                  if (
                    ((h = i),
                    'domain' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"domain"')),
                    null !== e)
                  )
                    if (null !== (t = M()))
                      if (null !== (r = V()))
                        if (null !== (s = Yt())) {
                          if (((l = []), (d = i), null !== (c = v())))
                            for (u = []; null !== c; ) u.push(c), (c = v())
                          else u = null
                          for (
                            null !== u && null !== (c = Yt())
                              ? (u = [u, c])
                              : ((u = null), (i = d));
                            null !== u;

                          ) {
                            if ((l.push(u), (d = i), null !== (c = v())))
                              for (u = []; null !== c; ) u.push(c), (c = v())
                            else u = null
                            null !== u && null !== (c = Yt())
                              ? (u = [u, c])
                              : ((u = null), (i = d))
                          }
                          null !== l && null !== (u = B())
                            ? (e = [e, t, r, s, l, u])
                            : ((e = null), (i = h))
                        } else (e = null), (i = h)
                      else (e = null), (i = h)
                    else (e = null), (i = h)
                  else (e = null), (i = h)
                  return e
                }
                function Yt () {
                  var e
                  return null === (e = Le()) && (e = je()), e
                }
                function $t () {
                  var e, t, r, s
                  return (
                    (s = i),
                    'nonce' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"nonce"')),
                    null !== e && null !== (t = M()) && null !== (r = Xt())
                      ? (e = [e, t, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function Xt () {
                  var e, t, n
                  return (
                    (t = i),
                    null !== (e = Y()) && ((n = e), (e = void (jn.nonce = n))),
                    null === e && (i = t),
                    e
                  )
                }
                function Jt () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'opaque' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"opaque"')),
                    null !== e && null !== (t = M()) && null !== (r = Y())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.opaque = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function Qt () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    'stale' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"stale"')),
                    null !== e && null !== (t = M())
                      ? ((l = i),
                        'true' === n.substr(i, 4).toLowerCase()
                          ? ((r = n.substr(i, 4)), (i += 4))
                          : ((r = null), 0 === o && a('"true"')),
                        null !== r && (r = void (jn.stale = !0)),
                        null === r && (i = l),
                        null === r &&
                          ((l = i),
                          'false' === n.substr(i, 5).toLowerCase()
                            ? ((r = n.substr(i, 5)), (i += 5))
                            : ((r = null), 0 === o && a('"false"')),
                          null !== r && (r = void (jn.stale = !1)),
                          null === r && (i = l)),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function Zt () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'algorithm' === n.substr(i, 9).toLowerCase()
                      ? ((e = n.substr(i, 9)), (i += 9))
                      : ((e = null), 0 === o && a('"algorithm"')),
                    null !== e && null !== (t = M())
                      ? ('md5' === n.substr(i, 3).toLowerCase()
                          ? ((r = n.substr(i, 3)), (i += 3))
                          : ((r = null), 0 === o && a('"MD5"')),
                        null === r &&
                          ('md5-sess' === n.substr(i, 8).toLowerCase()
                            ? ((r = n.substr(i, 8)), (i += 8))
                            : ((r = null), 0 === o && a('"MD5-sess"')),
                          null === r && (r = N())),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e[2]), (e = void (jn.algorithm = u.toUpperCase()))),
                    null === e && (i = s),
                    e
                  )
                }
                function en () {
                  var e, t, r, s, l, u, c, h, d, f
                  if (
                    ((h = i),
                    'qop' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"qop"')),
                    null !== e)
                  )
                    if (null !== (t = M()))
                      if (null !== (r = V())) {
                        if (((d = i), null !== (s = tn()))) {
                          for (
                            l = [],
                              f = i,
                              44 === n.charCodeAt(i)
                                ? ((u = ','), i++)
                                : ((u = null), 0 === o && a('","')),
                              null !== u && null !== (c = tn())
                                ? (u = [u, c])
                                : ((u = null), (i = f));
                            null !== u;

                          )
                            l.push(u),
                              (f = i),
                              44 === n.charCodeAt(i)
                                ? ((u = ','), i++)
                                : ((u = null), 0 === o && a('","')),
                              null !== u && null !== (c = tn())
                                ? (u = [u, c])
                                : ((u = null), (i = f))
                          null !== l ? (s = [s, l]) : ((s = null), (i = d))
                        } else (s = null), (i = d)
                        null !== s && null !== (l = B())
                          ? (e = [e, t, r, s, l])
                          : ((e = null), (i = h))
                      } else (e = null), (i = h)
                    else (e = null), (i = h)
                  else (e = null), (i = h)
                  return e
                }
                function tn () {
                  var e, t, r
                  return (
                    (t = i),
                    'auth-int' === n.substr(i, 8).toLowerCase()
                      ? ((e = n.substr(i, 8)), (i += 8))
                      : ((e = null), 0 === o && a('"auth-int"')),
                    null === e &&
                      ('auth' === n.substr(i, 4).toLowerCase()
                        ? ((e = n.substr(i, 4)), (i += 4))
                        : ((e = null), 0 === o && a('"auth"')),
                      null === e && (e = N())),
                    null !== e &&
                      ((r = e),
                      jn.qop || (jn.qop = []),
                      (e = void jn.qop.push(r.toLowerCase()))),
                    null === e && (i = t),
                    e
                  )
                }
                function nn () {
                  var e, t, n, r, s, o, l
                  if (((s = i), (o = i), null !== (e = mt()))) {
                    for (
                      t = [],
                        l = i,
                        null !== (n = G()) && null !== (r = St())
                          ? (n = [n, r])
                          : ((n = null), (i = l));
                      null !== n;

                    )
                      t.push(n),
                        (l = i),
                        null !== (n = G()) && null !== (r = St())
                          ? (n = [n, r])
                          : ((n = null), (i = l))
                    null !== t ? (e = [e, t]) : ((e = null), (i = o))
                  } else (e = null), (i = o)
                  return (
                    null !== e &&
                      (e = (function (e) {
                        var t
                        jn.multi_header || (jn.multi_header = [])
                        try {
                          ;(t = new Fn(jn.uri, jn.display_name, jn.params)),
                            delete jn.uri,
                            delete jn.display_name,
                            delete jn.params
                        } catch (e) {
                          t = null
                        }
                        jn.multi_header.push({
                          possition: i,
                          offset: e,
                          parsed: t
                        })
                      })(s)),
                    null === e && (i = s),
                    e
                  )
                }
                function rn () {
                  var e
                  return null === (e = sn()) && (e = St()), e
                }
                function sn () {
                  var e, t, r, s, l, u, c
                  if (
                    ((l = i),
                    (u = i),
                    'cause' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"cause"')),
                    null !== e)
                  )
                    if (null !== (t = M())) {
                      if (null !== (s = h()))
                        for (r = []; null !== s; ) r.push(s), (s = h())
                      else r = null
                      null !== r ? (e = [e, t, r]) : ((e = null), (i = u))
                    } else (e = null), (i = u)
                  else (e = null), (i = u)
                  return (
                    null !== e &&
                      ((c = e[2]),
                      (e = void (jn.cause = parseInt(c.join(''))))),
                    null === e && (i = l),
                    e
                  )
                }
                function on () {
                  var e, t, n, r, s, o
                  if (((s = i), null !== (e = mt()))) {
                    for (
                      t = [],
                        o = i,
                        null !== (n = G()) && null !== (r = St())
                          ? (n = [n, r])
                          : ((n = null), (i = o));
                      null !== n;

                    )
                      t.push(n),
                        (o = i),
                        null !== (n = G()) && null !== (r = St())
                          ? (n = [n, r])
                          : ((n = null), (i = o))
                    null !== t ? (e = [e, t]) : ((e = null), (i = s))
                  } else (e = null), (i = s)
                  return e
                }
                function ln () {
                  var e, t, r
                  return (
                    (t = i),
                    'active' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"active"')),
                    null === e &&
                      ('pending' === n.substr(i, 7).toLowerCase()
                        ? ((e = n.substr(i, 7)), (i += 7))
                        : ((e = null), 0 === o && a('"pending"')),
                      null === e &&
                        ('terminated' === n.substr(i, 10).toLowerCase()
                          ? ((e = n.substr(i, 10)), (i += 10))
                          : ((e = null), 0 === o && a('"terminated"')),
                        null === e && (e = N()))),
                    null !== e &&
                      ((r = t), (e = void (jn.state = n.substring(i, r)))),
                    null === e && (i = t),
                    e
                  )
                }
                function un () {
                  var e, t, r, s, l, u, c, h
                  return (
                    (s = i),
                    (l = i),
                    'reason' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"reason"')),
                    null !== e && null !== (t = M()) && null !== (r = an())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e &&
                      (e = void (void 0 !== (u = e[2]) && (jn.reason = u))),
                    null === e && (i = s),
                    null === e &&
                      ((s = i),
                      (l = i),
                      'expires' === n.substr(i, 7).toLowerCase()
                        ? ((e = n.substr(i, 7)), (i += 7))
                        : ((e = null), 0 === o && a('"expires"')),
                      null !== e && null !== (t = M()) && null !== (r = Ct())
                        ? (e = [e, t, r])
                        : ((e = null), (i = l)),
                      null !== e &&
                        (e = void (void 0 !== (h = e[2]) && (jn.expires = h))),
                      null === e && (i = s),
                      null === e &&
                        ((s = i),
                        (l = i),
                        'retry_after' === n.substr(i, 11).toLowerCase()
                          ? ((e = n.substr(i, 11)), (i += 11))
                          : ((e = null), 0 === o && a('"retry_after"')),
                        null !== e && null !== (t = M()) && null !== (r = Ct())
                          ? (e = [e, t, r])
                          : ((e = null), (i = l)),
                        null !== e &&
                          (e = void (
                            void 0 !== (c = e[2]) && (jn.retry_after = c)
                          )),
                        null === e && (i = s),
                        null === e && (e = St()))),
                    e
                  )
                }
                function an () {
                  var e
                  return (
                    'deactivated' === n.substr(i, 11).toLowerCase()
                      ? ((e = n.substr(i, 11)), (i += 11))
                      : ((e = null), 0 === o && a('"deactivated"')),
                    null === e &&
                      ('probation' === n.substr(i, 9).toLowerCase()
                        ? ((e = n.substr(i, 9)), (i += 9))
                        : ((e = null), 0 === o && a('"probation"')),
                      null === e &&
                        ('rejected' === n.substr(i, 8).toLowerCase()
                          ? ((e = n.substr(i, 8)), (i += 8))
                          : ((e = null), 0 === o && a('"rejected"')),
                        null === e &&
                          ('timeout' === n.substr(i, 7).toLowerCase()
                            ? ((e = n.substr(i, 7)), (i += 7))
                            : ((e = null), 0 === o && a('"timeout"')),
                          null === e &&
                            ('giveup' === n.substr(i, 6).toLowerCase()
                              ? ((e = n.substr(i, 6)), (i += 6))
                              : ((e = null), 0 === o && a('"giveup"')),
                            null === e &&
                              ('noresource' === n.substr(i, 10).toLowerCase()
                                ? ((e = n.substr(i, 10)), (i += 10))
                                : ((e = null), 0 === o && a('"noresource"')),
                              null === e &&
                                ('invariant' === n.substr(i, 9).toLowerCase()
                                  ? ((e = n.substr(i, 9)), (i += 9))
                                  : ((e = null), 0 === o && a('"invariant"')),
                                null === e && (e = N()))))))),
                    e
                  )
                }
                function cn () {
                  var e
                  return null === (e = Ft()) && (e = St()), e
                }
                function hn () {
                  var e, t, n, r, s, o, l, u
                  if (((l = i), null !== (e = yn())))
                    if (null !== (t = E()))
                      if (null !== (n = bn())) {
                        for (
                          r = [],
                            u = i,
                            null !== (s = G()) && null !== (o = dn())
                              ? (s = [s, o])
                              : ((s = null), (i = u));
                          null !== s;

                        )
                          r.push(s),
                            (u = i),
                            null !== (s = G()) && null !== (o = dn())
                              ? (s = [s, o])
                              : ((s = null), (i = u))
                        null !== r ? (e = [e, t, n, r]) : ((e = null), (i = l))
                      } else (e = null), (i = l)
                    else (e = null), (i = l)
                  else (e = null), (i = l)
                  return e
                }
                function dn () {
                  var e
                  return (
                    null === (e = fn()) &&
                      null === (e = _n()) &&
                      null === (e = pn()) &&
                      null === (e = mn()) &&
                      null === (e = vn()) &&
                      (e = St()),
                    e
                  )
                }
                function fn () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'ttl' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"ttl"')),
                    null !== e && null !== (t = M()) && null !== (r = An())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.ttl = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function _n () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'maddr' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"maddr"')),
                    null !== e && null !== (t = M()) && null !== (r = le())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.maddr = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function pn () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'received' === n.substr(i, 8).toLowerCase()
                      ? ((e = n.substr(i, 8)), (i += 8))
                      : ((e = null), 0 === o && a('"received"')),
                    null !== e && null !== (t = M())
                      ? (null === (r = pe()) && (r = de()),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.received = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function mn () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'branch' === n.substr(i, 6).toLowerCase()
                      ? ((e = n.substr(i, 6)), (i += 6))
                      : ((e = null), 0 === o && a('"branch"')),
                    null !== e && null !== (t = M()) && null !== (r = N())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.branch = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function vn () {
                  var e, t, r, s, l
                  return (
                    (s = i),
                    'rport' === n.substr(i, 5).toLowerCase()
                      ? ((e = n.substr(i, 5)), (i += 5))
                      : ((e = null), 0 === o && a('"rport"')),
                    null !== e
                      ? ((l = i),
                        null !== (t = M()) && null !== (r = gn())
                          ? (t = [t, r])
                          : ((t = null), (i = l)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = s)))
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function gn () {
                  var e, t, n, r, s, o, l, u
                  return (
                    (o = i),
                    (l = i),
                    null !== (e = null !== (e = h()) ? e : '') &&
                    null !== (t = null !== (t = h()) ? t : '') &&
                    null !== (n = null !== (n = h()) ? n : '') &&
                    null !== (r = null !== (r = h()) ? r : '') &&
                    null !== (s = null !== (s = h()) ? s : '')
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e), (e = void (jn.rport = parseInt(u.join(''))))),
                    null === e && (i = o),
                    e
                  )
                }
                function yn () {
                  var e, t, n, r, s, o
                  return (
                    (o = i),
                    null !== (e = Tn()) &&
                    null !== (t = P()) &&
                    null !== (n = N()) &&
                    null !== (r = P()) &&
                    null !== (s = Cn())
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = o)),
                    e
                  )
                }
                function Tn () {
                  var e, t, r
                  return (
                    (t = i),
                    'sip' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"SIP"')),
                    null === e && (e = N()),
                    null !== e && ((r = e), (e = void (jn.protocol = r))),
                    null === e && (i = t),
                    e
                  )
                }
                function Cn () {
                  var e, t, r
                  return (
                    (t = i),
                    'udp' === n.substr(i, 3).toLowerCase()
                      ? ((e = n.substr(i, 3)), (i += 3))
                      : ((e = null), 0 === o && a('"UDP"')),
                    null === e &&
                      ('tcp' === n.substr(i, 3).toLowerCase()
                        ? ((e = n.substr(i, 3)), (i += 3))
                        : ((e = null), 0 === o && a('"TCP"')),
                      null === e &&
                        ('tls' === n.substr(i, 3).toLowerCase()
                          ? ((e = n.substr(i, 3)), (i += 3))
                          : ((e = null), 0 === o && a('"TLS"')),
                        null === e &&
                          ('sctp' === n.substr(i, 4).toLowerCase()
                            ? ((e = n.substr(i, 4)), (i += 4))
                            : ((e = null), 0 === o && a('"SCTP"')),
                          null === e && (e = N())))),
                    null !== e && ((r = e), (e = void (jn.transport = r))),
                    null === e && (i = t),
                    e
                  )
                }
                function bn () {
                  var e, t, n, r, s
                  return (
                    (r = i),
                    null !== (e = Sn())
                      ? ((s = i),
                        null !== (t = W()) && null !== (n = En())
                          ? (t = [t, n])
                          : ((t = null), (i = s)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = r)))
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function Sn () {
                  var e, t, r
                  return (
                    (t = i),
                    null === (e = pe()) && null === (e = he()) && (e = ue()),
                    null !== e &&
                      ((r = t), (e = void (jn.host = n.substring(i, r)))),
                    null === e && (i = t),
                    e
                  )
                }
                function En () {
                  var e, t, n, r, s, o, l, u
                  return (
                    (o = i),
                    (l = i),
                    null !== (e = null !== (e = h()) ? e : '') &&
                    null !== (t = null !== (t = h()) ? t : '') &&
                    null !== (n = null !== (n = h()) ? n : '') &&
                    null !== (r = null !== (r = h()) ? r : '') &&
                    null !== (s = null !== (s = h()) ? s : '')
                      ? (e = [e, t, n, r, s])
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e), (e = void (jn.port = parseInt(u.join(''))))),
                    null === e && (i = o),
                    e
                  )
                }
                function An () {
                  var e, t, n, r, s
                  return (
                    (r = i),
                    (s = i),
                    null !== (e = h()) &&
                    null !== (t = null !== (t = h()) ? t : '') &&
                    null !== (n = null !== (n = h()) ? n : '')
                      ? (e = [e, t, n])
                      : ((e = null), (i = s)),
                    null !== e && (e = parseInt(e.join(''))),
                    null === e && (i = r),
                    e
                  )
                }
                function Rn () {
                  var e, t, n
                  return (
                    (t = i),
                    null !== (e = Ct()) &&
                      ((n = e), (e = void (jn.expires = n))),
                    null === e && (i = t),
                    e
                  )
                }
                function wn () {
                  var e
                  return null === (e = In()) && (e = St()), e
                }
                function In () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'refresher' === n.substr(i, 9).toLowerCase()
                      ? ((e = n.substr(i, 9)), (i += 9))
                      : ((e = null), 0 === o && a('"refresher"')),
                    null !== e && null !== (t = M())
                      ? ('uac' === n.substr(i, 3).toLowerCase()
                          ? ((r = n.substr(i, 3)), (i += 3))
                          : ((r = null), 0 === o && a('"uac"')),
                        null === r &&
                          ('uas' === n.substr(i, 3).toLowerCase()
                            ? ((r = n.substr(i, 3)), (i += 3))
                            : ((r = null), 0 === o && a('"uas"'))),
                        null !== r ? (e = [e, t, r]) : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((u = e[2]), (e = void (jn.refresher = u.toLowerCase()))),
                    null === e && (i = s),
                    e
                  )
                }
                function On () {
                  var e, t
                  for (
                    e = [],
                      null === (t = I()) && null === (t = k()) && (t = E());
                    null !== t;

                  )
                    e.push(t),
                      null === (t = I()) && null === (t = k()) && (t = E())
                  return e
                }
                function kn () {
                  var e, t, r, s, l, u, c, h, d, f, _, p
                  return (
                    (f = i),
                    (_ = i),
                    null !== (e = Un())
                      ? (45 === n.charCodeAt(i)
                          ? ((t = '-'), i++)
                          : ((t = null), 0 === o && a('"-"')),
                        null !== t && null !== (r = Nn())
                          ? (45 === n.charCodeAt(i)
                              ? ((s = '-'), i++)
                              : ((s = null), 0 === o && a('"-"')),
                            null !== s && null !== (l = Nn())
                              ? (45 === n.charCodeAt(i)
                                  ? ((u = '-'), i++)
                                  : ((u = null), 0 === o && a('"-"')),
                                null !== u && null !== (c = Nn())
                                  ? (45 === n.charCodeAt(i)
                                      ? ((h = '-'), i++)
                                      : ((h = null), 0 === o && a('"-"')),
                                    null !== h && null !== (d = Dn())
                                      ? (e = [e, t, r, s, l, u, c, h, d])
                                      : ((e = null), (i = _)))
                                  : ((e = null), (i = _)))
                              : ((e = null), (i = _)))
                          : ((e = null), (i = _)))
                      : ((e = null), (i = _)),
                    null !== e &&
                      ((p = f), e[0], (e = void (jn = n.substring(i + 5, p)))),
                    null === e && (i = f),
                    e
                  )
                }
                function Nn () {
                  var e, t, n, r, s
                  return (
                    (s = i),
                    null !== (e = f()) &&
                    null !== (t = f()) &&
                    null !== (n = f()) &&
                    null !== (r = f())
                      ? (e = [e, t, n, r])
                      : ((e = null), (i = s)),
                    e
                  )
                }
                function Un () {
                  var e, t, n
                  return (
                    (n = i),
                    null !== (e = Nn()) && null !== (t = Nn())
                      ? (e = [e, t])
                      : ((e = null), (i = n)),
                    e
                  )
                }
                function Dn () {
                  var e, t, n, r
                  return (
                    (r = i),
                    null !== (e = Nn()) &&
                    null !== (t = Nn()) &&
                    null !== (n = Nn())
                      ? (e = [e, t, n])
                      : ((e = null), (i = r)),
                    e
                  )
                }
                function xn () {
                  var e, t, r, s, l, u, c
                  return (
                    (s = i),
                    (l = i),
                    null !== (e = D())
                      ? ((u = i),
                        64 === n.charCodeAt(i)
                          ? ((t = '@'), i++)
                          : ((t = null), 0 === o && a('"@"')),
                        null !== t && null !== (r = D())
                          ? (t = [t, r])
                          : ((t = null), (i = u)),
                        null !== (t = null !== t ? t : '')
                          ? (e = [e, t])
                          : ((e = null), (i = l)))
                      : ((e = null), (i = l)),
                    null !== e &&
                      ((c = s), (e = void (jn.call_id = n.substring(i, c)))),
                    null === e && (i = s),
                    e
                  )
                }
                function Pn () {
                  var e
                  return (
                    null === (e = Mn()) &&
                      null === (e = qn()) &&
                      null === (e = Ln()) &&
                      (e = St()),
                    e
                  )
                }
                function Mn () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'to-tag' === n.substr(i, 6)
                      ? ((e = 'to-tag'), (i += 6))
                      : ((e = null), 0 === o && a('"to-tag"')),
                    null !== e && null !== (t = M()) && null !== (r = N())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.to_tag = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function qn () {
                  var e, t, r, s, l, u
                  return (
                    (s = i),
                    (l = i),
                    'from-tag' === n.substr(i, 8)
                      ? ((e = 'from-tag'), (i += 8))
                      : ((e = null), 0 === o && a('"from-tag"')),
                    null !== e && null !== (t = M()) && null !== (r = N())
                      ? (e = [e, t, r])
                      : ((e = null), (i = l)),
                    null !== e && ((u = e[2]), (e = void (jn.from_tag = u))),
                    null === e && (i = s),
                    e
                  )
                }
                function Ln () {
                  var e, t
                  return (
                    (t = i),
                    'early-only' === n.substr(i, 10)
                      ? ((e = 'early-only'), (i += 10))
                      : ((e = null), 0 === o && a('"early-only"')),
                    null !== e && (e = void (jn.early_only = !0)),
                    null === e && (i = t),
                    e
                  )
                }
                var Hn = e('./URI'),
                  Fn = e('./NameAddrHeader'),
                  jn = {}
                if (null === s[r]() || i !== n.length) {
                  var Gn = Math.max(i, l),
                    Wn = Gn < n.length ? n.charAt(Gn) : null,
                    Vn = (function () {
                      for (
                        var e = 1, t = 1, r = !1, s = 0;
                        s < Math.max(i, l);
                        s++
                      ) {
                        var o = n.charAt(s)
                        '\n' === o
                          ? (r || e++, (t = 1), (r = !1))
                          : '\r' === o || '\u2028' === o || '\u2029' === o
                          ? (e++, (t = 1), (r = !0))
                          : (t++, (r = !1))
                      }
                      return { line: e, column: t }
                    })()
                  return (
                    new this.SyntaxError(
                      (function (e) {
                        e.sort()
                        for (var t = null, n = [], r = 0; r < e.length; r++)
                          e[r] !== t && (n.push(e[r]), (t = e[r]))
                        return n
                      })(u),
                      Wn,
                      Gn,
                      Vn.line,
                      Vn.column
                    ),
                    -1
                  )
                }
                return jn
              },
              toSource: function () {
                return this._source
              },
              SyntaxError: function (e, n, r, s, i) {
                ;(this.name = 'SyntaxError'),
                  (this.expected = e),
                  (this.found = n),
                  (this.message = (function (e, n) {
                    var r
                    switch (e.length) {
                      case 0:
                        r = 'end of input'
                        break
                      case 1:
                        r = e[0]
                        break
                      default:
                        r =
                          e.slice(0, e.length - 1).join(', ') +
                          ' or ' +
                          e[e.length - 1]
                    }
                    return (
                      'Expected ' +
                      r +
                      ' but ' +
                      (n ? t(n) : 'end of input') +
                      ' found.'
                    )
                  })(e, n)),
                  (this.offset = r),
                  (this.line = s),
                  (this.column = i)
              }
            }
            return (n.SyntaxError.prototype = Error.prototype), n
          })()
        },
        { './NameAddrHeader': 11, './URI': 27 }
      ],
      8: [
        function (e, t, n) {
          'use strict'
          var r = e('../package.json'),
            s = e('./Constants'),
            i = e('./Exceptions'),
            o = e('./Utils'),
            l = e('./UA'),
            u = e('./URI'),
            a = e('./NameAddrHeader'),
            c = e('./Grammar'),
            h = e('./WebSocketInterface')
          e('debug')('JsSIP')('version %s', r.version),
            (t.exports = {
              C: s,
              Exceptions: i,
              Utils: o,
              UA: l,
              URI: u,
              NameAddrHeader: a,
              WebSocketInterface: h,
              Grammar: c,
              debug: e('debug'),
              get name () {
                return r.title
              },
              get version () {
                return r.version
              }
            })
        },
        {
          '../package.json': 40,
          './Constants': 2,
          './Exceptions': 6,
          './Grammar': 7,
          './NameAddrHeader': 11,
          './UA': 26,
          './URI': 27,
          './Utils': 28,
          './WebSocketInterface': 29,
          debug: 32
        }
      ],
      9: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('debug'),
            i = 'JsSIP'
          t.exports = (function () {
            function e (t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                t
                  ? ((this._debug = s.default(''.concat(i, ':').concat(t))),
                    (this._warn = s.default(''.concat(i, ':WARN:').concat(t))),
                    (this._error = s.default(
                      ''.concat(i, ':ERROR:').concat(t)
                    )))
                  : ((this._debug = s.default(i)),
                    (this._warn = s.default(''.concat(i, ':WARN'))),
                    (this._error = s.default(''.concat(i, ':ERROR')))),
                (this._debug.log = console.info.bind(console)),
                (this._warn.log = console.warn.bind(console)),
                (this._error.log = console.error.bind(console))
            }
            var t, n, o
            return (
              (t = e),
              (n = [
                {
                  key: 'debug',
                  get: function () {
                    return this._debug
                  }
                },
                {
                  key: 'warn',
                  get: function () {
                    return this._warn
                  }
                },
                {
                  key: 'error',
                  get: function () {
                    return this._error
                  }
                }
              ]) && r(t.prototype, n),
              o && r(t, o),
              e
            )
          })()
        },
        { debug: 32 }
      ],
      10: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var u = e('events').EventEmitter,
            a = e('./Logger'),
            c = e('./Constants'),
            h = e('./SIPMessage'),
            d = e('./Utils'),
            f = e('./RequestSender'),
            _ = e('./Exceptions'),
            p = e('./URI'),
            m = new a('Message')
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && i(e, t)
            })(a, u)
            var t,
              n,
              r,
              l = o(a)
            function a (e) {
              var t
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, a),
                ((t = l.call(this))._ua = e),
                (t._request = null),
                (t._closed = !1),
                (t._direction = null),
                (t._local_identity = null),
                (t._remote_identity = null),
                (t._is_replied = !1),
                (t._data = {}),
                t
              )
            }
            return (
              (t = a),
              (n = [
                {
                  key: 'send',
                  value: function (e, t) {
                    var n = this,
                      r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      s = e
                    if (void 0 === e || void 0 === t)
                      throw new TypeError('Not enough arguments')
                    if (!(e = this._ua.normalizeTarget(e)))
                      throw new TypeError('Invalid target: '.concat(s))
                    var i = d.cloneArray(r.extraHeaders),
                      o = d.cloneObject(r.eventHandlers),
                      l = r.contentType || 'text/plain',
                      u = {}
                    for (var a in (r.fromUserName &&
                      ((u.from_uri = new p(
                        'sip',
                        r.fromUserName,
                        this._ua.configuration.uri.host
                      )),
                      i.push(
                        'P-Preferred-Identity: '.concat(
                          this._ua.configuration.uri.toString()
                        )
                      )),
                    r.fromDisplayName &&
                      (u.from_display_name = r.fromDisplayName),
                    o))
                      Object.prototype.hasOwnProperty.call(o, a) &&
                        this.on(a, o[a])
                    i.push('Content-Type: '.concat(l)),
                      (this._request = new h.OutgoingRequest(
                        c.MESSAGE,
                        e,
                        this._ua,
                        u,
                        i
                      )),
                      t && (this._request.body = t)
                    var _ = new f(this._ua, this._request, {
                      onRequestTimeout: function () {
                        n._onRequestTimeout()
                      },
                      onTransportError: function () {
                        n._onTransportError()
                      },
                      onReceiveResponse: function (e) {
                        n._receiveResponse(e)
                      }
                    })
                    this._newMessage('local', this._request), _.send()
                  }
                },
                {
                  key: 'init_incoming',
                  value: function (e) {
                    ;(this._request = e),
                      this._newMessage('remote', e),
                      this._is_replied ||
                        ((this._is_replied = !0), e.reply(200)),
                      this._close()
                  }
                },
                {
                  key: 'accept',
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = d.cloneArray(e.extraHeaders),
                      n = e.body
                    if ('incoming' !== this._direction)
                      throw new _.NotSupportedError(
                        '"accept" not supported for outgoing Message'
                      )
                    if (this._is_replied)
                      throw new Error('incoming Message already replied')
                    ;(this._is_replied = !0),
                      this._request.reply(200, null, t, n)
                  }
                },
                {
                  key: 'reject',
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = e.status_code || 480,
                      n = e.reason_phrase,
                      r = d.cloneArray(e.extraHeaders),
                      s = e.body
                    if ('incoming' !== this._direction)
                      throw new _.NotSupportedError(
                        '"reject" not supported for outgoing Message'
                      )
                    if (this._is_replied)
                      throw new Error('incoming Message already replied')
                    if (t < 300 || t >= 700)
                      throw new TypeError('Invalid status_code: '.concat(t))
                    ;(this._is_replied = !0), this._request.reply(t, n, r, s)
                  }
                },
                {
                  key: '_receiveResponse',
                  value: function (e) {
                    if (!this._closed)
                      switch (!0) {
                        case /^1[0-9]{2}$/.test(e.status_code):
                          break
                        case /^2[0-9]{2}$/.test(e.status_code):
                          this._succeeded('remote', e)
                          break
                        default:
                          var t = d.sipErrorCause(e.status_code)
                          this._failed('remote', e, t)
                      }
                  }
                },
                {
                  key: '_onRequestTimeout',
                  value: function () {
                    this._closed ||
                      this._failed('system', null, c.causes.REQUEST_TIMEOUT)
                  }
                },
                {
                  key: '_onTransportError',
                  value: function () {
                    this._closed ||
                      this._failed('system', null, c.causes.CONNECTION_ERROR)
                  }
                },
                {
                  key: '_close',
                  value: function () {
                    ;(this._closed = !0), this._ua.destroyMessage(this)
                  }
                },
                {
                  key: '_newMessage',
                  value: function (e, t) {
                    'remote' === e
                      ? ((this._direction = 'incoming'),
                        (this._local_identity = t.to),
                        (this._remote_identity = t.from))
                      : 'local' === e &&
                        ((this._direction = 'outgoing'),
                        (this._local_identity = t.from),
                        (this._remote_identity = t.to)),
                      this._ua.newMessage(this, {
                        originator: e,
                        message: this,
                        request: t
                      })
                  }
                },
                {
                  key: '_failed',
                  value: function (e, t, n) {
                    m.debug('MESSAGE failed'),
                      this._close(),
                      m.debug('emit "failed"'),
                      this.emit('failed', {
                        originator: e,
                        response: t || null,
                        cause: n
                      })
                  }
                },
                {
                  key: '_succeeded',
                  value: function (e, t) {
                    m.debug('MESSAGE succeeded'),
                      this._close(),
                      m.debug('emit "succeeded"'),
                      this.emit('succeeded', { originator: e, response: t })
                  }
                },
                {
                  key: 'direction',
                  get: function () {
                    return this._direction
                  }
                },
                {
                  key: 'local_identity',
                  get: function () {
                    return this._local_identity
                  }
                },
                {
                  key: 'remote_identity',
                  get: function () {
                    return this._remote_identity
                  }
                }
              ]) && s(t.prototype, n),
              r && s(t, r),
              a
            )
          })()
        },
        {
          './Constants': 2,
          './Exceptions': 6,
          './Logger': 9,
          './RequestSender': 20,
          './SIPMessage': 21,
          './URI': 27,
          './Utils': 28,
          events: 31
        }
      ],
      11: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function s (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
          }
          var i = e('./URI'),
            o = e('./Grammar')
          t.exports = (function () {
            function e (t, n, r) {
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e),
                !(t && t instanceof i))
              )
                throw new TypeError('missing or invalid "uri" parameter')
              for (var s in ((this._uri = t),
              (this._parameters = {}),
              (this.display_name = n),
              r))
                Object.prototype.hasOwnProperty.call(r, s) &&
                  this.setParam(s, r[s])
            }
            return (
              s(e, null, [
                {
                  key: 'parse',
                  value: function (e) {
                    return -1 !== (e = o.parse(e, 'Name_Addr_Header'))
                      ? e
                      : void 0
                  }
                }
              ]),
              s(e, [
                {
                  key: 'setParam',
                  value: function (e, t) {
                    e &&
                      (this._parameters[e.toLowerCase()] =
                        null == t ? null : t.toString())
                  }
                },
                {
                  key: 'getParam',
                  value: function (e) {
                    if (e) return this._parameters[e.toLowerCase()]
                  }
                },
                {
                  key: 'hasParam',
                  value: function (e) {
                    if (e)
                      return !!this._parameters.hasOwnProperty(e.toLowerCase())
                  }
                },
                {
                  key: 'deleteParam',
                  value: function (e) {
                    if (
                      ((e = e.toLowerCase()),
                      this._parameters.hasOwnProperty(e))
                    ) {
                      var t = this._parameters[e]
                      return delete this._parameters[e], t
                    }
                  }
                },
                {
                  key: 'clearParams',
                  value: function () {
                    this._parameters = {}
                  }
                },
                {
                  key: 'clone',
                  value: function () {
                    return new e(
                      this._uri.clone(),
                      this._display_name,
                      JSON.parse(JSON.stringify(this._parameters))
                    )
                  }
                },
                {
                  key: '_quote',
                  value: function (e) {
                    return e.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                  }
                },
                {
                  key: 'toString',
                  value: function () {
                    var e = this._display_name
                      ? '"'.concat(this._quote(this._display_name), '" ')
                      : ''
                    for (var t in ((e += '<'.concat(this._uri.toString(), '>')),
                    this._parameters))
                      Object.prototype.hasOwnProperty.call(
                        this._parameters,
                        t
                      ) &&
                        ((e += ';'.concat(t)),
                        null !== this._parameters[t] &&
                          (e += '='.concat(this._parameters[t])))
                    return e
                  }
                },
                {
                  key: 'uri',
                  get: function () {
                    return this._uri
                  }
                },
                {
                  key: 'display_name',
                  get: function () {
                    return this._display_name
                  },
                  set: function (e) {
                    this._display_name = 0 === e ? '0' : e
                  }
                }
              ]),
              e
            )
          })()
        },
        { './Grammar': 7, './URI': 27 }
      ],
      12: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var u = e('events').EventEmitter,
            a = e('./Logger'),
            c = e('./Constants'),
            h = e('./SIPMessage'),
            d = e('./Utils'),
            f = e('./RequestSender'),
            _ = e('./Exceptions'),
            p = new a('Options')
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && i(e, t)
            })(a, u)
            var t,
              n,
              r,
              l = o(a)
            function a (e) {
              var t
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, a),
                ((t = l.call(this))._ua = e),
                (t._request = null),
                (t._closed = !1),
                (t._direction = null),
                (t._local_identity = null),
                (t._remote_identity = null),
                (t._is_replied = !1),
                (t._data = {}),
                t
              )
            }
            return (
              (t = a),
              (n = [
                {
                  key: 'send',
                  value: function (e, t) {
                    var n = this,
                      r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      s = e
                    if (void 0 === e)
                      throw new TypeError('A target is required for OPTIONS')
                    if (!(e = this._ua.normalizeTarget(e)))
                      throw new TypeError('Invalid target: '.concat(s))
                    var i = d.cloneArray(r.extraHeaders),
                      o = d.cloneObject(r.eventHandlers),
                      l = r.contentType || 'application/sdp'
                    for (var u in o)
                      Object.prototype.hasOwnProperty.call(o, u) &&
                        this.on(u, o[u])
                    i.push('Content-Type: '.concat(l)),
                      (this._request = new h.OutgoingRequest(
                        c.OPTIONS,
                        e,
                        this._ua,
                        null,
                        i
                      )),
                      t && (this._request.body = t)
                    var a = new f(this._ua, this._request, {
                      onRequestTimeout: function () {
                        n._onRequestTimeout()
                      },
                      onTransportError: function () {
                        n._onTransportError()
                      },
                      onReceiveResponse: function (e) {
                        n._receiveResponse(e)
                      }
                    })
                    this._newOptions('local', this._request), a.send()
                  }
                },
                {
                  key: 'init_incoming',
                  value: function (e) {
                    ;(this._request = e),
                      this._newOptions('remote', e),
                      this._is_replied ||
                        ((this._is_replied = !0), e.reply(200)),
                      this._close()
                  }
                },
                {
                  key: 'accept',
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = d.cloneArray(e.extraHeaders),
                      n = e.body
                    if ('incoming' !== this._direction)
                      throw new _.NotSupportedError(
                        '"accept" not supported for outgoing Options'
                      )
                    if (this._is_replied)
                      throw new Error('incoming Options already replied')
                    ;(this._is_replied = !0),
                      this._request.reply(200, null, t, n)
                  }
                },
                {
                  key: 'reject',
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      t = e.status_code || 480,
                      n = e.reason_phrase,
                      r = d.cloneArray(e.extraHeaders),
                      s = e.body
                    if ('incoming' !== this._direction)
                      throw new _.NotSupportedError(
                        '"reject" not supported for outgoing Options'
                      )
                    if (this._is_replied)
                      throw new Error('incoming Options already replied')
                    if (t < 300 || t >= 700)
                      throw new TypeError('Invalid status_code: '.concat(t))
                    ;(this._is_replied = !0), this._request.reply(t, n, r, s)
                  }
                },
                {
                  key: '_receiveResponse',
                  value: function (e) {
                    if (!this._closed)
                      switch (!0) {
                        case /^1[0-9]{2}$/.test(e.status_code):
                          break
                        case /^2[0-9]{2}$/.test(e.status_code):
                          this._succeeded('remote', e)
                          break
                        default:
                          var t = d.sipErrorCause(e.status_code)
                          this._failed('remote', e, t)
                      }
                  }
                },
                {
                  key: '_onRequestTimeout',
                  value: function () {
                    this._closed ||
                      this._failed('system', null, c.causes.REQUEST_TIMEOUT)
                  }
                },
                {
                  key: '_onTransportError',
                  value: function () {
                    this._closed ||
                      this._failed('system', null, c.causes.CONNECTION_ERROR)
                  }
                },
                {
                  key: '_close',
                  value: function () {
                    ;(this._closed = !0), this._ua.destroyMessage(this)
                  }
                },
                {
                  key: '_newOptions',
                  value: function (e, t) {
                    'remote' === e
                      ? ((this._direction = 'incoming'),
                        (this._local_identity = t.to),
                        (this._remote_identity = t.from))
                      : 'local' === e &&
                        ((this._direction = 'outgoing'),
                        (this._local_identity = t.from),
                        (this._remote_identity = t.to)),
                      this._ua.newOptions(this, {
                        originator: e,
                        message: this,
                        request: t
                      })
                  }
                },
                {
                  key: '_failed',
                  value: function (e, t, n) {
                    p.debug('OPTIONS failed'),
                      this._close(),
                      p.debug('emit "failed"'),
                      this.emit('failed', {
                        originator: e,
                        response: t || null,
                        cause: n
                      })
                  }
                },
                {
                  key: '_succeeded',
                  value: function (e, t) {
                    p.debug('OPTIONS succeeded'),
                      this._close(),
                      p.debug('emit "succeeded"'),
                      this.emit('succeeded', { originator: e, response: t })
                  }
                },
                {
                  key: 'direction',
                  get: function () {
                    return this._direction
                  }
                },
                {
                  key: 'local_identity',
                  get: function () {
                    return this._local_identity
                  }
                },
                {
                  key: 'remote_identity',
                  get: function () {
                    return this._remote_identity
                  }
                }
              ]) && s(t.prototype, n),
              r && s(t, r),
              a
            )
          })()
        },
        {
          './Constants': 2,
          './Exceptions': 6,
          './Logger': 9,
          './RequestSender': 20,
          './SIPMessage': 21,
          './Utils': 28,
          events: 31
        }
      ],
      13: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return s(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return s(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  i = function () {}
                return {
                  s: i,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: i
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function s (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          var i = e('./Logger'),
            o = e('./Grammar'),
            l = e('./SIPMessage'),
            u = new i('Parser')
          function a (e, t) {
            var n = t,
              r = 0,
              s = 0
            if (e.substring(n, n + 2).match(/(^\r\n)/)) return -2
            for (; 0 === r; ) {
              if (-1 === (s = e.indexOf('\r\n', n))) return s
              !e.substring(s + 2, s + 4).match(/(^\r\n)/) &&
              e.charAt(s + 2).match(/(^\s+)/)
                ? (n = s + 2)
                : (r = s)
            }
            return r
          }
          function c (e, t, n, s) {
            var i,
              u = t.indexOf(':', n),
              a = t.substring(n, u).trim(),
              c = t.substring(u + 1, s).trim()
            switch (a.toLowerCase()) {
              case 'via':
              case 'v':
                e.addHeader('via', c),
                  1 === e.getHeaders('via').length
                    ? (i = e.parseHeader('Via')) &&
                      ((e.via = i), (e.via_branch = i.branch))
                    : (i = 0)
                break
              case 'from':
              case 'f':
                e.setHeader('from', c),
                  (i = e.parseHeader('from')) &&
                    ((e.from = i), (e.from_tag = i.getParam('tag')))
                break
              case 'to':
              case 't':
                e.setHeader('to', c),
                  (i = e.parseHeader('to')) &&
                    ((e.to = i), (e.to_tag = i.getParam('tag')))
                break
              case 'record-route':
                if (-1 === (i = o.parse(c, 'Record_Route'))) i = void 0
                else {
                  var h,
                    d = r(i)
                  try {
                    for (d.s(); !(h = d.n()).done; ) {
                      var f = h.value
                      e.addHeader(
                        'record-route',
                        c.substring(f.possition, f.offset)
                      ),
                        (e.headers['Record-Route'][
                          e.getHeaders('record-route').length - 1
                        ].parsed = f.parsed)
                    }
                  } catch (e) {
                    d.e(e)
                  } finally {
                    d.f()
                  }
                }
                break
              case 'call-id':
              case 'i':
                e.setHeader('call-id', c),
                  (i = e.parseHeader('call-id')) && (e.call_id = c)
                break
              case 'contact':
              case 'm':
                if (-1 === (i = o.parse(c, 'Contact'))) i = void 0
                else {
                  var _,
                    p = r(i)
                  try {
                    for (p.s(); !(_ = p.n()).done; ) {
                      var m = _.value
                      e.addHeader(
                        'contact',
                        c.substring(m.possition, m.offset)
                      ),
                        (e.headers.Contact[
                          e.getHeaders('contact').length - 1
                        ].parsed = m.parsed)
                    }
                  } catch (e) {
                    p.e(e)
                  } finally {
                    p.f()
                  }
                }
                break
              case 'content-length':
              case 'l':
                e.setHeader('content-length', c),
                  (i = e.parseHeader('content-length'))
                break
              case 'content-type':
              case 'c':
                e.setHeader('content-type', c),
                  (i = e.parseHeader('content-type'))
                break
              case 'cseq':
                e.setHeader('cseq', c),
                  (i = e.parseHeader('cseq')) && (e.cseq = i.value),
                  e instanceof l.IncomingResponse && (e.method = i.method)
                break
              case 'max-forwards':
                e.setHeader('max-forwards', c),
                  (i = e.parseHeader('max-forwards'))
                break
              case 'www-authenticate':
                e.setHeader('www-authenticate', c),
                  (i = e.parseHeader('www-authenticate'))
                break
              case 'proxy-authenticate':
                e.setHeader('proxy-authenticate', c),
                  (i = e.parseHeader('proxy-authenticate'))
                break
              case 'session-expires':
              case 'x':
                e.setHeader('session-expires', c),
                  (i = e.parseHeader('session-expires')) &&
                    ((e.session_expires = i.expires),
                    (e.session_expires_refresher = i.refresher))
                break
              case 'refer-to':
              case 'r':
                e.setHeader('refer-to', c),
                  (i = e.parseHeader('refer-to')) && (e.refer_to = i)
                break
              case 'replaces':
                e.setHeader('replaces', c),
                  (i = e.parseHeader('replaces')) && (e.replaces = i)
                break
              case 'event':
              case 'o':
                e.setHeader('event', c),
                  (i = e.parseHeader('event')) && (e.event = i)
                break
              default:
                e.addHeader(a, c), (i = 0)
            }
            return (
              void 0 !== i || { error: 'error parsing header "'.concat(a, '"') }
            )
          }
          n.parseMessage = function (e, t) {
            var n,
              r,
              s = e.indexOf('\r\n')
            if (-1 !== s) {
              var i = e.substring(0, s),
                h = o.parse(i, 'Request_Response')
              if (-1 !== h) {
                h.status_code
                  ? (((n = new l.IncomingResponse()).status_code =
                      h.status_code),
                    (n.reason_phrase = h.reason_phrase))
                  : (((n = new l.IncomingRequest(t)).method = h.method),
                    (n.ruri = h.uri)),
                  (n.data = e)
                for (var d = s + 2; ; ) {
                  if (-2 === (s = a(e, d))) {
                    r = d + 2
                    break
                  }
                  if (-1 === s)
                    return void u.warn('parseMessage() | malformed message')
                  if (!0 !== (h = c(n, e, d, s)))
                    return void u.warn('parseMessage() |', h.error)
                  d = s + 2
                }
                if (n.hasHeader('content-length')) {
                  var f = n.getHeader('content-length')
                  n.body = e.substr(r, f)
                } else n.body = e.substring(r)
                return n
              }
              u.warn(
                'parseMessage() | error parsing first line of SIP message: "'.concat(
                  i,
                  '"'
                )
              )
            } else u.warn('parseMessage() | no CRLF found, not a SIP message')
          }
        },
        { './Grammar': 7, './Logger': 9, './SIPMessage': 21 }
      ],
      14: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return i(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return i(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  s = function () {}
                return {
                  s: s,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: s
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function i (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          function o (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function l (e, t, n) {
            return t && o(e.prototype, t), n && o(e, n), e
          }
          function u (e, t) {
            return (u =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function a (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = c(e)
              if (t) {
                var i = c(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function c (e) {
            return (c = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var h = e('events').EventEmitter,
            d = e('sdp-transform'),
            f = e('./Logger'),
            _ = e('./Constants'),
            p = e('./Exceptions'),
            m = e('./Transactions'),
            v = e('./Utils'),
            g = e('./Timers'),
            y = e('./SIPMessage'),
            T = e('./Dialog'),
            C = e('./RequestSender'),
            b = e('./RTCSession/DTMF'),
            S = e('./RTCSession/Info'),
            E = e('./RTCSession/ReferNotifier'),
            A = e('./RTCSession/ReferSubscriber'),
            R = e('./URI'),
            w = new f('RTCSession'),
            I = {
              STATUS_NULL: 0,
              STATUS_INVITE_SENT: 1,
              STATUS_1XX_RECEIVED: 2,
              STATUS_INVITE_RECEIVED: 3,
              STATUS_WAITING_FOR_ANSWER: 4,
              STATUS_ANSWERED: 5,
              STATUS_WAITING_FOR_ACK: 6,
              STATUS_CANCELED: 7,
              STATUS_TERMINATED: 8,
              STATUS_CONFIRMED: 9
            },
            O = ['audio', 'video']
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && u(e, t)
            })(n, h)
            var t = a(n)
            function n (e) {
              var r
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, n),
                w.debug('new'),
                ((r = t.call(this))._id = null),
                (r._ua = e),
                (r._status = I.STATUS_NULL),
                (r._dialog = null),
                (r._earlyDialogs = {}),
                (r._contact = null),
                (r._from_tag = null),
                (r._to_tag = null),
                (r._connection = null),
                (r._connectionPromiseQueue = Promise.resolve()),
                (r._request = null),
                (r._is_canceled = !1),
                (r._cancel_reason = ''),
                (r._is_confirmed = !1),
                (r._late_sdp = !1),
                (r._rtcOfferConstraints = null),
                (r._rtcAnswerConstraints = null),
                (r._localMediaStream = null),
                (r._localMediaStreamLocallyGenerated = !1),
                (r._rtcReady = !0),
                (r._iceReady = !1),
                (r._timers = {
                  ackTimer: null,
                  expiresTimer: null,
                  invite2xxTimer: null,
                  userNoAnswerTimer: null
                }),
                (r._direction = null),
                (r._local_identity = null),
                (r._remote_identity = null),
                (r._start_time = null),
                (r._end_time = null),
                (r._tones = null),
                (r._audioMuted = !1),
                (r._videoMuted = !1),
                (r._localHold = !1),
                (r._remoteHold = !1),
                (r._sessionTimers = {
                  enabled: r._ua.configuration.session_timers,
                  refreshMethod:
                    r._ua.configuration.session_timers_refresh_method,
                  defaultExpires: _.SESSION_EXPIRES,
                  currentExpires: null,
                  running: !1,
                  refresher: !1,
                  timer: null
                }),
                (r._referSubscribers = {}),
                (r._data = {}),
                r
              )
            }
            return (
              l(n, null, [
                {
                  key: 'C',
                  get: function () {
                    return I
                  }
                }
              ]),
              l(n, [
                {
                  key: 'isInProgress',
                  value: function () {
                    switch (this._status) {
                      case I.STATUS_NULL:
                      case I.STATUS_INVITE_SENT:
                      case I.STATUS_1XX_RECEIVED:
                      case I.STATUS_INVITE_RECEIVED:
                      case I.STATUS_WAITING_FOR_ANSWER:
                        return !0
                      default:
                        return !1
                    }
                  }
                },
                {
                  key: 'isEstablished',
                  value: function () {
                    switch (this._status) {
                      case I.STATUS_ANSWERED:
                      case I.STATUS_WAITING_FOR_ACK:
                      case I.STATUS_CONFIRMED:
                        return !0
                      default:
                        return !1
                    }
                  }
                },
                {
                  key: 'isEnded',
                  value: function () {
                    switch (this._status) {
                      case I.STATUS_CANCELED:
                      case I.STATUS_TERMINATED:
                        return !0
                      default:
                        return !1
                    }
                  }
                },
                {
                  key: 'isMuted',
                  value: function () {
                    return { audio: this._audioMuted, video: this._videoMuted }
                  }
                },
                {
                  key: 'isOnHold',
                  value: function () {
                    return { local: this._localHold, remote: this._remoteHold }
                  }
                },
                {
                  key: 'connect',
                  value: function (e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      n = arguments.length > 2 ? arguments[2] : void 0
                    w.debug('connect()')
                    var r = e,
                      s = v.cloneObject(t.eventHandlers),
                      i = v.cloneArray(t.extraHeaders),
                      o = v.cloneObject(t.mediaConstraints, {
                        audio: !0,
                        video: !0
                      }),
                      l = t.mediaStream || null,
                      u = v.cloneObject(t.pcConfig, { iceServers: [] }),
                      a = t.rtcConstraints || null,
                      c = t.rtcOfferConstraints || null
                    if (
                      ((this._rtcOfferConstraints = c),
                      (this._rtcAnswerConstraints =
                        t.rtcAnswerConstraints || null),
                      (this._data = t.data || this._data),
                      void 0 === e)
                    )
                      throw new TypeError('Not enough arguments')
                    if (this._status !== I.STATUS_NULL)
                      throw new p.InvalidStateError(this._status)
                    if (!window.RTCPeerConnection)
                      throw new p.NotSupportedError('WebRTC not supported')
                    if (!(e = this._ua.normalizeTarget(e)))
                      throw new TypeError('Invalid target: '.concat(r))
                    for (var h in (this._sessionTimers.enabled &&
                      v.isDecimal(t.sessionTimersExpires) &&
                      (t.sessionTimersExpires >= _.MIN_SESSION_EXPIRES
                        ? (this._sessionTimers.defaultExpires =
                            t.sessionTimersExpires)
                        : (this._sessionTimers.defaultExpires =
                            _.SESSION_EXPIRES)),
                    s))
                      Object.prototype.hasOwnProperty.call(s, h) &&
                        this.on(h, s[h])
                    this._from_tag = v.newTag()
                    var d = t.anonymous || !1,
                      f = { from_tag: this._from_tag }
                    ;(this._contact = this._ua.contact.toString({
                      anonymous: d,
                      outbound: !0
                    })),
                      d
                        ? ((f.from_display_name = 'Anonymous'),
                          (f.from_uri = new R(
                            'sip',
                            'anonymous',
                            'anonymous.invalid'
                          )),
                          i.push(
                            'P-Preferred-Identity: '.concat(
                              this._ua.configuration.uri.toString()
                            )
                          ),
                          i.push('Privacy: id'))
                        : t.fromUserName &&
                          ((f.from_uri = new R(
                            'sip',
                            t.fromUserName,
                            this._ua.configuration.uri.host
                          )),
                          i.push(
                            'P-Preferred-Identity: '.concat(
                              this._ua.configuration.uri.toString()
                            )
                          )),
                      t.fromDisplayName &&
                        (f.from_display_name = t.fromDisplayName),
                      i.push('Contact: '.concat(this._contact)),
                      i.push('Content-Type: application/sdp'),
                      this._sessionTimers.enabled &&
                        i.push(
                          'Session-Expires: '
                            .concat(this._sessionTimers.defaultExpires)
                            .concat(
                              this._ua.configuration
                                .session_timers_force_refresher
                                ? ';refresher=uac'
                                : ''
                            )
                        ),
                      (this._request = new y.InitialOutgoingInviteRequest(
                        e,
                        this._ua,
                        f,
                        i
                      )),
                      (this._id = this._request.call_id + this._from_tag),
                      this._createRTCConnection(u, a),
                      (this._direction = 'outgoing'),
                      (this._local_identity = this._request.from),
                      (this._remote_identity = this._request.to),
                      n && n(this),
                      this._newRTCSession('local', this._request),
                      this._sendInitialRequest(o, c, l)
                  }
                },
                {
                  key: 'init_incoming',
                  value: function (e, t) {
                    var n,
                      r = this
                    w.debug('init_incoming()')
                    var s = e.hasHeader('Content-Type')
                      ? e.getHeader('Content-Type').toLowerCase()
                      : void 0
                    e.body && 'application/sdp' !== s
                      ? e.reply(415)
                      : ((this._status = I.STATUS_INVITE_RECEIVED),
                        (this._from_tag = e.from_tag),
                        (this._id = e.call_id + this._from_tag),
                        (this._request = e),
                        (this._contact = this._ua.contact.toString()),
                        e.hasHeader('expires') &&
                          (n = 1e3 * e.getHeader('expires')),
                        (e.to_tag = v.newTag()),
                        this._createDialog(e, 'UAS', !0)
                          ? (e.body
                              ? (this._late_sdp = !1)
                              : (this._late_sdp = !0),
                            (this._status = I.STATUS_WAITING_FOR_ANSWER),
                            (this._timers.userNoAnswerTimer = setTimeout(
                              function () {
                                e.reply(408),
                                  r._failed('local', null, _.causes.NO_ANSWER)
                              },
                              this._ua.configuration.no_answer_timeout
                            )),
                            n &&
                              (this._timers.expiresTimer = setTimeout(
                                function () {
                                  r._status === I.STATUS_WAITING_FOR_ANSWER &&
                                    (e.reply(487),
                                    r._failed('system', null, _.causes.EXPIRES))
                                },
                                n
                              )),
                            (this._direction = 'incoming'),
                            (this._local_identity = e.to),
                            (this._remote_identity = e.from),
                            t && t(this),
                            this._newRTCSession('remote', e),
                            this._status !== I.STATUS_TERMINATED &&
                              (e.reply(180, null, [
                                'Contact: '.concat(this._contact)
                              ]),
                              this._progress('local', null)))
                          : e.reply(500, 'Missing Contact header field'))
                  }
                },
                {
                  key: 'answer',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    w.debug('answer()')
                    var n = this._request,
                      r = v.cloneArray(t.extraHeaders),
                      i = v.cloneObject(t.mediaConstraints),
                      o = t.mediaStream || null,
                      l = v.cloneObject(t.pcConfig, { iceServers: [] }),
                      u = t.rtcConstraints || null,
                      a = t.rtcAnswerConstraints || null,
                      c = v.cloneObject(t.rtcOfferConstraints),
                      h = !1,
                      d = !1,
                      f = !1,
                      m = !1
                    if (
                      ((this._rtcAnswerConstraints = a),
                      (this._rtcOfferConstraints =
                        t.rtcOfferConstraints || null),
                      (this._data = t.data || this._data),
                      'incoming' !== this._direction)
                    )
                      throw new p.NotSupportedError(
                        '"answer" not supported for outgoing RTCSession'
                      )
                    if (this._status !== I.STATUS_WAITING_FOR_ANSWER)
                      throw new p.InvalidStateError(this._status)
                    if (
                      (this._sessionTimers.enabled &&
                        v.isDecimal(t.sessionTimersExpires) &&
                        (t.sessionTimersExpires >= _.MIN_SESSION_EXPIRES
                          ? (this._sessionTimers.defaultExpires =
                              t.sessionTimersExpires)
                          : (this._sessionTimers.defaultExpires =
                              _.SESSION_EXPIRES)),
                      (this._status = I.STATUS_ANSWERED),
                      this._createDialog(n, 'UAS'))
                    ) {
                      clearTimeout(this._timers.userNoAnswerTimer),
                        r.unshift('Contact: '.concat(this._contact))
                      var g = n.parseSDP()
                      Array.isArray(g.media) || (g.media = [g.media])
                      var y,
                        T = s(g.media)
                      try {
                        for (T.s(); !(y = T.n()).done; ) {
                          var C = y.value
                          'audio' === C.type &&
                            ((h = !0),
                            (C.direction && 'sendrecv' !== C.direction) ||
                              (f = !0)),
                            'video' === C.type &&
                              ((d = !0),
                              (C.direction && 'sendrecv' !== C.direction) ||
                                (m = !0))
                        }
                      } catch (e) {
                        T.e(e)
                      } finally {
                        T.f()
                      }
                      if (o && !1 === i.audio) {
                        var b,
                          S = s(o.getAudioTracks())
                        try {
                          for (S.s(); !(b = S.n()).done; ) {
                            var E = b.value
                            o.removeTrack(E)
                          }
                        } catch (e) {
                          S.e(e)
                        } finally {
                          S.f()
                        }
                      }
                      if (o && !1 === i.video) {
                        var A,
                          R = s(o.getVideoTracks())
                        try {
                          for (R.s(); !(A = R.n()).done; ) {
                            var O = A.value
                            o.removeTrack(O)
                          }
                        } catch (e) {
                          R.e(e)
                        } finally {
                          R.f()
                        }
                      }
                      o || void 0 !== i.audio || (i.audio = f),
                        o || void 0 !== i.video || (i.video = m),
                        o || h || c.offerToReceiveAudio || (i.audio = !1),
                        o || d || c.offerToReceiveVideo || (i.video = !1),
                        this._createRTCConnection(l, u),
                        Promise.resolve()
                          .then(function () {
                            return (
                              o ||
                              (i.audio || i.video
                                ? ((e._localMediaStreamLocallyGenerated = !0),
                                  navigator.mediaDevices
                                    .getUserMedia(i)
                                    .catch(function (t) {
                                      if (e._status === I.STATUS_TERMINATED)
                                        throw new Error('terminated')
                                      throw (n.reply(480),
                                      e._failed(
                                        'local',
                                        null,
                                        _.causes.USER_DENIED_MEDIA_ACCESS
                                      ),
                                      w.warn(
                                        'emit "getusermediafailed" [error:%o]',
                                        t
                                      ),
                                      e.emit('getusermediafailed', t),
                                      new Error('getUserMedia() failed'))
                                    }))
                                : void 0)
                            )
                          })
                          .then(function (t) {
                            if (e._status === I.STATUS_TERMINATED)
                              throw new Error('terminated')
                            ;(e._localMediaStream = t),
                              t &&
                                t.getTracks().forEach(function (n) {
                                  e._connection.addTrack(n, t)
                                })
                          })
                          .then(function () {
                            if (!e._late_sdp) {
                              var t = {
                                originator: 'remote',
                                type: 'offer',
                                sdp: n.body
                              }
                              w.debug('emit "sdp"'), e.emit('sdp', t)
                              var r = new RTCSessionDescription({
                                type: 'offer',
                                sdp: t.sdp
                              })
                              return (
                                (e._connectionPromiseQueue = e._connectionPromiseQueue
                                  .then(function () {
                                    return e._connection.setRemoteDescription(r)
                                  })
                                  .catch(function (t) {
                                    throw (n.reply(488),
                                    e._failed(
                                      'system',
                                      null,
                                      _.causes.WEBRTC_ERROR
                                    ),
                                    w.warn(
                                      'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                      t
                                    ),
                                    e.emit(
                                      'peerconnection:setremotedescriptionfailed',
                                      t
                                    ),
                                    new Error(
                                      'peerconnection.setRemoteDescription() failed'
                                    ))
                                  })),
                                e._connectionPromiseQueue
                              )
                            }
                          })
                          .then(function () {
                            if (e._status === I.STATUS_TERMINATED)
                              throw new Error('terminated')
                            return (
                              e._connecting(n),
                              e._late_sdp
                                ? e
                                    ._createLocalDescription(
                                      'offer',
                                      e._rtcOfferConstraints
                                    )
                                    .catch(function () {
                                      throw (n.reply(500),
                                      new Error(
                                        '_createLocalDescription() failed'
                                      ))
                                    })
                                : e
                                    ._createLocalDescription('answer', a)
                                    .catch(function () {
                                      throw (n.reply(500),
                                      new Error(
                                        '_createLocalDescription() failed'
                                      ))
                                    })
                            )
                          })
                          .then(function (t) {
                            if (e._status === I.STATUS_TERMINATED)
                              throw new Error('terminated')
                            e._handleSessionTimersInIncomingRequest(n, r),
                              n.reply(
                                200,
                                null,
                                r,
                                t,
                                function () {
                                  ;(e._status = I.STATUS_WAITING_FOR_ACK),
                                    e._setInvite2xxTimer(n, t),
                                    e._setACKTimer(),
                                    e._accepted('local')
                                },
                                function () {
                                  e._failed(
                                    'system',
                                    null,
                                    _.causes.CONNECTION_ERROR
                                  )
                                }
                              )
                          })
                          .catch(function (t) {
                            e._status !== I.STATUS_TERMINATED && w.warn(t)
                          })
                    } else n.reply(500, 'Error creating dialog')
                  }
                },
                {
                  key: 'terminate',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    w.debug('terminate()')
                    var n,
                      r = t.cause || _.causes.BYE,
                      s = v.cloneArray(t.extraHeaders),
                      i = t.body,
                      o = t.status_code,
                      l = t.reason_phrase
                    if (this._status === I.STATUS_TERMINATED)
                      throw new p.InvalidStateError(this._status)
                    switch (this._status) {
                      case I.STATUS_NULL:
                      case I.STATUS_INVITE_SENT:
                      case I.STATUS_1XX_RECEIVED:
                        if (
                          (w.debug('canceling session'),
                          o && (o < 200 || o >= 700))
                        )
                          throw new TypeError('Invalid status_code: '.concat(o))
                        o &&
                          ((l = l || _.REASON_PHRASE[o] || ''),
                          (n = 'SIP ;cause='
                            .concat(o, ' ;text="')
                            .concat(l, '"'))),
                          this._status === I.STATUS_NULL ||
                          this._status === I.STATUS_INVITE_SENT
                            ? ((this._is_canceled = !0),
                              (this._cancel_reason = n))
                            : this._status === I.STATUS_1XX_RECEIVED &&
                              this._request.cancel(n),
                          (this._status = I.STATUS_CANCELED),
                          this._failed('local', null, _.causes.CANCELED)
                        break
                      case I.STATUS_WAITING_FOR_ANSWER:
                      case I.STATUS_ANSWERED:
                        if (
                          (w.debug('rejecting session'),
                          (o = o || 480) < 300 || o >= 700)
                        )
                          throw new TypeError('Invalid status_code: '.concat(o))
                        this._request.reply(o, l, s, i),
                          this._failed('local', null, _.causes.REJECTED)
                        break
                      case I.STATUS_WAITING_FOR_ACK:
                      case I.STATUS_CONFIRMED:
                        if (
                          (w.debug('terminating session'),
                          (l = t.reason_phrase || _.REASON_PHRASE[o] || ''),
                          o && (o < 200 || o >= 700))
                        )
                          throw new TypeError('Invalid status_code: '.concat(o))
                        if (
                          (o &&
                            s.push(
                              'Reason: SIP ;cause='
                                .concat(o, '; text="')
                                .concat(l, '"')
                            ),
                          this._status === I.STATUS_WAITING_FOR_ACK &&
                            'incoming' === this._direction &&
                            this._request.server_transaction.state !==
                              m.C.STATUS_TERMINATED)
                        ) {
                          var u = this._dialog
                          ;(this.receiveRequest = function (t) {
                            t.method === _.ACK &&
                              (e.sendRequest(_.BYE, {
                                extraHeaders: s,
                                body: i
                              }),
                              u.terminate())
                          }),
                            this._request.server_transaction.on(
                              'stateChanged',
                              function () {
                                e._request.server_transaction.state ===
                                  m.C.STATUS_TERMINATED &&
                                  (e.sendRequest(_.BYE, {
                                    extraHeaders: s,
                                    body: i
                                  }),
                                  u.terminate())
                              }
                            ),
                            this._ended('local', null, r),
                            (this._dialog = u),
                            this._ua.newDialog(u)
                        } else
                          this.sendRequest(_.BYE, { extraHeaders: s, body: i }),
                            this._ended('local', null, r)
                    }
                  }
                },
                {
                  key: 'sendDTMF',
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {}
                    w.debug('sendDTMF() | tones: %s', e)
                    var n = 0,
                      r = t.duration || null,
                      s = t.interToneGap || null,
                      i = t.transportType || _.DTMF_TRANSPORT.INFO
                    if (void 0 === e)
                      throw new TypeError('Not enough arguments')
                    if (
                      this._status !== I.STATUS_CONFIRMED &&
                      this._status !== I.STATUS_WAITING_FOR_ACK &&
                      this._status !== I.STATUS_1XX_RECEIVED
                    )
                      throw new p.InvalidStateError(this._status)
                    if (
                      i !== _.DTMF_TRANSPORT.INFO &&
                      i !== _.DTMF_TRANSPORT.RFC2833
                    )
                      throw new TypeError('invalid transportType: '.concat(i))
                    if (
                      ('number' == typeof e && (e = e.toString()),
                      !e ||
                        'string' != typeof e ||
                        !e.match(/^[0-9A-DR#*,]+$/i))
                    )
                      throw new TypeError('Invalid tones: '.concat(e))
                    if (r && !v.isDecimal(r))
                      throw new TypeError('Invalid tone duration: '.concat(r))
                    if (
                      (r
                        ? r < b.C.MIN_DURATION
                          ? (w.debug(
                              '"duration" value is lower than the minimum allowed, setting it to '.concat(
                                b.C.MIN_DURATION,
                                ' milliseconds'
                              )
                            ),
                            (r = b.C.MIN_DURATION))
                          : r > b.C.MAX_DURATION
                          ? (w.debug(
                              '"duration" value is greater than the maximum allowed, setting it to '.concat(
                                b.C.MAX_DURATION,
                                ' milliseconds'
                              )
                            ),
                            (r = b.C.MAX_DURATION))
                          : (r = Math.abs(r))
                        : (r = b.C.DEFAULT_DURATION),
                      (t.duration = r),
                      s && !v.isDecimal(s))
                    )
                      throw new TypeError('Invalid interToneGap: '.concat(s))
                    if (
                      (s
                        ? s < b.C.MIN_INTER_TONE_GAP
                          ? (w.debug(
                              '"interToneGap" value is lower than the minimum allowed, setting it to '.concat(
                                b.C.MIN_INTER_TONE_GAP,
                                ' milliseconds'
                              )
                            ),
                            (s = b.C.MIN_INTER_TONE_GAP))
                          : (s = Math.abs(s))
                        : (s = b.C.DEFAULT_INTER_TONE_GAP),
                      i !== _.DTMF_TRANSPORT.RFC2833)
                    )
                      this._tones
                        ? (this._tones += e)
                        : ((this._tones = e),
                          function e () {
                            var i = this
                            var o
                            if (
                              this._status === I.STATUS_TERMINATED ||
                              !this._tones ||
                              n >= this._tones.length
                            )
                              return void (this._tones = null)
                            var l = this._tones[n]
                            n += 1
                            if (',' === l) o = 2e3
                            else {
                              var u = new b(this)
                              ;(t.eventHandlers = {
                                onFailed: function () {
                                  i._tones = null
                                }
                              }),
                                u.send(l, t),
                                (o = r + s)
                            }
                            setTimeout(e.bind(this), o)
                          }.call(this))
                    else {
                      var o = this._getDTMFRTPSender()
                      o && ((e = o.toneBuffer + e), o.insertDTMF(e, r, s))
                    }
                  }
                },
                {
                  key: 'sendInfo',
                  value: function (e, t) {
                    var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {}
                    if (
                      (w.debug('sendInfo()'),
                      this._status !== I.STATUS_CONFIRMED &&
                        this._status !== I.STATUS_WAITING_FOR_ACK &&
                        this._status !== I.STATUS_1XX_RECEIVED)
                    )
                      throw new p.InvalidStateError(this._status)
                    new S(this).send(e, t, n)
                  }
                },
                {
                  key: 'mute',
                  value: function () {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : { audio: !0, video: !1 }
                    w.debug('mute()')
                    var t = !1,
                      n = !1
                    !1 === this._audioMuted &&
                      e.audio &&
                      ((t = !0),
                      (this._audioMuted = !0),
                      this._toggleMuteAudio(!0)),
                      !1 === this._videoMuted &&
                        e.video &&
                        ((n = !0),
                        (this._videoMuted = !0),
                        this._toggleMuteVideo(!0)),
                      (!0 !== t && !0 !== n) ||
                        this._onmute({ audio: t, video: n })
                  }
                },
                {
                  key: 'unmute',
                  value: function () {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : { audio: !0, video: !0 }
                    w.debug('unmute()')
                    var t = !1,
                      n = !1
                    !0 === this._audioMuted &&
                      e.audio &&
                      ((t = !0),
                      (this._audioMuted = !1),
                      !1 === this._localHold && this._toggleMuteAudio(!1)),
                      !0 === this._videoMuted &&
                        e.video &&
                        ((n = !0),
                        (this._videoMuted = !1),
                        !1 === this._localHold && this._toggleMuteVideo(!1)),
                      (!0 !== t && !0 !== n) ||
                        this._onunmute({ audio: t, video: n })
                  }
                },
                {
                  key: 'hold',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      n = arguments.length > 1 ? arguments[1] : void 0
                    if (
                      (w.debug('hold()'),
                      this._status !== I.STATUS_WAITING_FOR_ACK &&
                        this._status !== I.STATUS_CONFIRMED)
                    )
                      return !1
                    if (!0 === this._localHold) return !1
                    if (!this._isReadyToReOffer()) return !1
                    ;(this._localHold = !0), this._onhold('local')
                    var r = {
                      succeeded: function () {
                        n && n()
                      },
                      failed: function () {
                        e.terminate({
                          cause: _.causes.WEBRTC_ERROR,
                          status_code: 500,
                          reason_phrase: 'Hold Failed'
                        })
                      }
                    }
                    return (
                      t.useUpdate
                        ? this._sendUpdate({
                            sdpOffer: !0,
                            eventHandlers: r,
                            extraHeaders: t.extraHeaders
                          })
                        : this._sendReinvite({
                            eventHandlers: r,
                            extraHeaders: t.extraHeaders
                          }),
                      !0
                    )
                  }
                },
                {
                  key: 'unhold',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      n = arguments.length > 1 ? arguments[1] : void 0
                    if (
                      (w.debug('unhold()'),
                      this._status !== I.STATUS_WAITING_FOR_ACK &&
                        this._status !== I.STATUS_CONFIRMED)
                    )
                      return !1
                    if (!1 === this._localHold) return !1
                    if (!this._isReadyToReOffer()) return !1
                    ;(this._localHold = !1), this._onunhold('local')
                    var r = {
                      succeeded: function () {
                        n && n()
                      },
                      failed: function () {
                        e.terminate({
                          cause: _.causes.WEBRTC_ERROR,
                          status_code: 500,
                          reason_phrase: 'Unhold Failed'
                        })
                      }
                    }
                    return (
                      t.useUpdate
                        ? this._sendUpdate({
                            sdpOffer: !0,
                            eventHandlers: r,
                            extraHeaders: t.extraHeaders
                          })
                        : this._sendReinvite({
                            eventHandlers: r,
                            extraHeaders: t.extraHeaders
                          }),
                      !0
                    )
                  }
                },
                {
                  key: 'renegotiate',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      n = arguments.length > 1 ? arguments[1] : void 0
                    w.debug('renegotiate()')
                    var r = t.rtcOfferConstraints || null
                    if (
                      this._status !== I.STATUS_WAITING_FOR_ACK &&
                      this._status !== I.STATUS_CONFIRMED
                    )
                      return !1
                    if (!this._isReadyToReOffer()) return !1
                    var s = {
                      succeeded: function () {
                        n && n()
                      },
                      failed: function () {
                        e.terminate({
                          cause: _.causes.WEBRTC_ERROR,
                          status_code: 500,
                          reason_phrase: 'Media Renegotiation Failed'
                        })
                      }
                    }
                    return (
                      this._setLocalMediaStatus(),
                      t.useUpdate
                        ? this._sendUpdate({
                            sdpOffer: !0,
                            eventHandlers: s,
                            rtcOfferConstraints: r,
                            extraHeaders: t.extraHeaders
                          })
                        : this._sendReinvite({
                            eventHandlers: s,
                            rtcOfferConstraints: r,
                            extraHeaders: t.extraHeaders
                          }),
                      !0
                    )
                  }
                },
                {
                  key: 'refer',
                  value: function (e, t) {
                    var n = this
                    w.debug('refer()')
                    var r = e
                    if (
                      this._status !== I.STATUS_WAITING_FOR_ACK &&
                      this._status !== I.STATUS_CONFIRMED
                    )
                      return !1
                    if (!(e = this._ua.normalizeTarget(e)))
                      throw new TypeError('Invalid target: '.concat(r))
                    var s = new A(this)
                    s.sendRefer(e, t)
                    var i = s.id
                    return (
                      (this._referSubscribers[i] = s),
                      s.on('requestFailed', function () {
                        delete n._referSubscribers[i]
                      }),
                      s.on('accepted', function () {
                        delete n._referSubscribers[i]
                      }),
                      s.on('failed', function () {
                        delete n._referSubscribers[i]
                      }),
                      s
                    )
                  }
                },
                {
                  key: 'sendRequest',
                  value: function (e, t) {
                    return (
                      w.debug('sendRequest()'), this._dialog.sendRequest(e, t)
                    )
                  }
                },
                {
                  key: 'receiveRequest',
                  value: function (e) {
                    var t = this
                    if ((w.debug('receiveRequest()'), e.method === _.CANCEL))
                      (this._status !== I.STATUS_WAITING_FOR_ANSWER &&
                        this._status !== I.STATUS_ANSWERED) ||
                        ((this._status = I.STATUS_CANCELED),
                        this._request.reply(487),
                        this._failed('remote', e, _.causes.CANCELED))
                    else
                      switch (e.method) {
                        case _.ACK:
                          if (this._status !== I.STATUS_WAITING_FOR_ACK) return
                          if (
                            ((this._status = I.STATUS_CONFIRMED),
                            clearTimeout(this._timers.ackTimer),
                            clearTimeout(this._timers.invite2xxTimer),
                            this._late_sdp)
                          ) {
                            if (!e.body) {
                              this.terminate({
                                cause: _.causes.MISSING_SDP,
                                status_code: 400
                              })
                              break
                            }
                            var n = {
                              originator: 'remote',
                              type: 'answer',
                              sdp: e.body
                            }
                            w.debug('emit "sdp"'), this.emit('sdp', n)
                            var r = new RTCSessionDescription({
                              type: 'answer',
                              sdp: n.sdp
                            })
                            this._connectionPromiseQueue = this._connectionPromiseQueue
                              .then(function () {
                                return t._connection.setRemoteDescription(r)
                              })
                              .then(function () {
                                t._is_confirmed || t._confirmed('remote', e)
                              })
                              .catch(function (e) {
                                t.terminate({
                                  cause: _.causes.BAD_MEDIA_DESCRIPTION,
                                  status_code: 488
                                }),
                                  w.warn(
                                    'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                    e
                                  ),
                                  t.emit(
                                    'peerconnection:setremotedescriptionfailed',
                                    e
                                  )
                              })
                          } else
                            this._is_confirmed || this._confirmed('remote', e)
                          break
                        case _.BYE:
                          this._status === I.STATUS_CONFIRMED ||
                          this._status === I.STATUS_WAITING_FOR_ACK
                            ? (e.reply(200),
                              this._ended('remote', e, _.causes.BYE))
                            : this._status === I.STATUS_INVITE_RECEIVED ||
                              this._status === I.STATUS_WAITING_FOR_ANSWER
                            ? (e.reply(200),
                              this._request.reply(487, 'BYE Received'),
                              this._ended('remote', e, _.causes.BYE))
                            : e.reply(403, 'Wrong Status')
                          break
                        case _.INVITE:
                          this._status === I.STATUS_CONFIRMED
                            ? e.hasHeader('replaces')
                              ? this._receiveReplaces(e)
                              : this._receiveReinvite(e)
                            : e.reply(403, 'Wrong Status')
                          break
                        case _.INFO:
                          if (
                            this._status === I.STATUS_1XX_RECEIVED ||
                            this._status === I.STATUS_WAITING_FOR_ANSWER ||
                            this._status === I.STATUS_ANSWERED ||
                            this._status === I.STATUS_WAITING_FOR_ACK ||
                            this._status === I.STATUS_CONFIRMED
                          ) {
                            var s = e.hasHeader('Content-Type')
                              ? e.getHeader('Content-Type').toLowerCase()
                              : void 0
                            s && s.match(/^application\/dtmf-relay/i)
                              ? new b(this).init_incoming(e)
                              : void 0 !== s
                              ? new S(this).init_incoming(e)
                              : e.reply(415)
                          } else e.reply(403, 'Wrong Status')
                          break
                        case _.UPDATE:
                          this._status === I.STATUS_CONFIRMED
                            ? this._receiveUpdate(e)
                            : e.reply(403, 'Wrong Status')
                          break
                        case _.REFER:
                          this._status === I.STATUS_CONFIRMED
                            ? this._receiveRefer(e)
                            : e.reply(403, 'Wrong Status')
                          break
                        case _.NOTIFY:
                          this._status === I.STATUS_CONFIRMED
                            ? this._receiveNotify(e)
                            : e.reply(403, 'Wrong Status')
                          break
                        default:
                          e.reply(501)
                      }
                  }
                },
                {
                  key: 'onTransportError',
                  value: function () {
                    w.warn('onTransportError()'),
                      this._status !== I.STATUS_TERMINATED &&
                        this.terminate({
                          status_code: 500,
                          reason_phrase: _.causes.CONNECTION_ERROR,
                          cause: _.causes.CONNECTION_ERROR
                        })
                  }
                },
                {
                  key: 'onRequestTimeout',
                  value: function () {
                    w.warn('onRequestTimeout()'),
                      this._status !== I.STATUS_TERMINATED &&
                        this.terminate({
                          status_code: 408,
                          reason_phrase: _.causes.REQUEST_TIMEOUT,
                          cause: _.causes.REQUEST_TIMEOUT
                        })
                  }
                },
                {
                  key: 'onDialogError',
                  value: function () {
                    w.warn('onDialogError()'),
                      this._status !== I.STATUS_TERMINATED &&
                        this.terminate({
                          status_code: 500,
                          reason_phrase: _.causes.DIALOG_ERROR,
                          cause: _.causes.DIALOG_ERROR
                        })
                  }
                },
                {
                  key: 'newDTMF',
                  value: function (e) {
                    w.debug('newDTMF()'), this.emit('newDTMF', e)
                  }
                },
                {
                  key: 'newInfo',
                  value: function (e) {
                    w.debug('newInfo()'), this.emit('newInfo', e)
                  }
                },
                {
                  key: '_isReadyToReOffer',
                  value: function () {
                    return this._rtcReady
                      ? this._dialog
                        ? (!0 !== this._dialog.uac_pending_reply &&
                            !0 !== this._dialog.uas_pending_reply) ||
                          (w.debug(
                            '_isReadyToReOffer() | there is another INVITE/UPDATE transaction in progress'
                          ),
                          !1)
                        : (w.debug(
                            '_isReadyToReOffer() | session not established yet'
                          ),
                          !1)
                      : (w.debug(
                          '_isReadyToReOffer() | internal WebRTC status not ready'
                        ),
                        !1)
                  }
                },
                {
                  key: '_close',
                  value: function () {
                    if (
                      (w.debug('close()'),
                      this._localMediaStream &&
                        this._localMediaStreamLocallyGenerated &&
                        (w.debug('close() | closing local MediaStream'),
                        v.closeMediaStream(this._localMediaStream)),
                      this._status !== I.STATUS_TERMINATED)
                    ) {
                      if (
                        ((this._status = I.STATUS_TERMINATED), this._connection)
                      )
                        try {
                          this._connection.close()
                        } catch (e) {
                          w.warn(
                            'close() | error closing the RTCPeerConnection: %o',
                            e
                          )
                        }
                      for (var e in this._timers)
                        Object.prototype.hasOwnProperty.call(this._timers, e) &&
                          clearTimeout(this._timers[e])
                      for (var t in (clearTimeout(this._sessionTimers.timer),
                      this._dialog &&
                        (this._dialog.terminate(), delete this._dialog),
                      this._earlyDialogs))
                        Object.prototype.hasOwnProperty.call(
                          this._earlyDialogs,
                          t
                        ) &&
                          (this._earlyDialogs[t].terminate(),
                          delete this._earlyDialogs[t])
                      for (var n in this._referSubscribers)
                        Object.prototype.hasOwnProperty.call(
                          this._referSubscribers,
                          n
                        ) && delete this._referSubscribers[n]
                      this._ua.destroyRTCSession(this)
                    }
                  }
                },
                {
                  key: '_setInvite2xxTimer',
                  value: function (e, t) {
                    var n = g.T1
                    this._timers.invite2xxTimer = setTimeout(
                      function r () {
                        this._status === I.STATUS_WAITING_FOR_ACK &&
                          (e.reply(
                            200,
                            null,
                            ['Contact: '.concat(this._contact)],
                            t
                          ),
                          n < g.T2 && (n *= 2) > g.T2 && (n = g.T2),
                          (this._timers.invite2xxTimer = setTimeout(
                            r.bind(this),
                            n
                          )))
                      }.bind(this),
                      n
                    )
                  }
                },
                {
                  key: '_setACKTimer',
                  value: function () {
                    var e = this
                    this._timers.ackTimer = setTimeout(function () {
                      e._status === I.STATUS_WAITING_FOR_ACK &&
                        (w.debug('no ACK received, terminating the session'),
                        clearTimeout(e._timers.invite2xxTimer),
                        e.sendRequest(_.BYE),
                        e._ended('remote', null, _.causes.NO_ACK))
                    }, g.TIMER_H)
                  }
                },
                {
                  key: '_createRTCConnection',
                  value: function (e, t) {
                    var n = this
                    ;(this._connection = new RTCPeerConnection(e, t)),
                      this._connection.addEventListener(
                        'iceconnectionstatechange',
                        function () {
                          'failed' === n._connection.iceConnectionState &&
                            n.terminate({
                              cause: _.causes.RTP_TIMEOUT,
                              status_code: 408,
                              reason_phrase: _.causes.RTP_TIMEOUT
                            })
                        }
                      ),
                      w.debug('emit "peerconnection"'),
                      this.emit('peerconnection', {
                        peerconnection: this._connection
                      })
                  }
                },
                {
                  key: '_createLocalDescription',
                  value: function (e, t) {
                    var n = this
                    if (
                      (w.debug('createLocalDescription()'),
                      'offer' !== e && 'answer' !== e)
                    )
                      throw new Error(
                        'createLocalDescription() | invalid type "'.concat(
                          e,
                          '"'
                        )
                      )
                    var r = this._connection
                    return (
                      (this._rtcReady = !1),
                      Promise.resolve()
                        .then(function () {
                          return 'offer' === e
                            ? r
                                .createOffer(t)
                                .catch(function (e) {
                                  return (
                                    w.warn(
                                      'emit "peerconnection:createofferfailed" [error:%o]',
                                      e
                                    ),
                                    n.emit(
                                      'peerconnection:createofferfailed',
                                      e
                                    ),
                                    Promise.reject(e)
                                  )
                                })
                            : r.createAnswer(t).catch(function (e) {
                                return (
                                  w.warn(
                                    'emit "peerconnection:createanswerfailed" [error:%o]',
                                    e
                                  ),
                                  n.emit(
                                    'peerconnection:createanswerfailed',
                                    e
                                  ),
                                  Promise.reject(e)
                                )
                              })
                        })
                        .then(function (e) {
                          console.log(e)
                          /* e.sdp =  'v=0\r\n' +
                          'o=Infinivirt 1983 678902 IN IP4 208.89.104.142\r\n' +
                          's=Infinivirt\r\n' +
                          'c=IN IP4 208.89.104.142\r\n' +
                          't=0 0\r\n' +
                          'm=audio 57592 RTP/AVP 8\r\n' +
                          'a=rtpmap:8 PCMA/8000\r\n' +
                          'a=ptime:20\r\n' +
                          'a=fmtp:101 0-16\r\n' +
                          'a=sendrecv\r\n' */
                         // e.sdp = e.sdp.replace('UDP/TLS/RTP/SAVPF', 'RTP/AVP')
                          console.log(e)
                          return r.setLocalDescription(e).catch(function (e) {
                            return (
                              (n._rtcReady = !0),
                              w.warn(
                                'emit "peerconnection:setlocaldescriptionfailed" [error:%o]',
                                e
                              ),
                              n.emit(
                                'peerconnection:setlocaldescriptionfailed',
                                e
                              ),
                              Promise.reject(e)
                            )
                          })
                        })
                        .then(function () {
                          var s = t && t.iceRestart
                          if (
                            ('complete' === r.iceGatheringState && !s) ||
                            ('gathering' === r.iceGatheringState && n._iceReady)
                          ) {
                            n._rtcReady = !0
                            var i = {
                              originator: 'local',
                              type: e,
                              sdp: r.localDescription.sdp
                            }
                            return (
                              w.debug('emit "sdp"'),
                              n.emit('sdp', i),
                              Promise.resolve(i.sdp)
                            )
                          }
                          return new Promise(function (t) {
                            var s,
                              i,
                              o = !1
                            n._iceReady = !1
                            var l = function () {
                              r.removeEventListener('icecandidate', s),
                                r.removeEventListener(
                                  'icegatheringstatechange',
                                  i
                                ),
                                (o = !0),
                                (n._rtcReady = !0),
                                (n._iceReady = !0)
                              var l = {
                                originator: 'local',
                                type: e,
                                sdp: r.localDescription.sdp
                              }
                              w.debug('emit "sdp"'), n.emit('sdp', l), t(l.sdp)
                            }
                            r.addEventListener(
                              'icecandidate',
                              (s = function (e) {
                                var t = e.candidate
                                t
                                  ? n.emit('icecandidate', {
                                      candidate: t,
                                      ready: l
                                    })
                                  : o || l()
                              })
                            ),
                              r.addEventListener(
                                'icegatheringstatechange',
                                (i = function () {
                                  'complete' !== r.iceGatheringState || o || l()
                                })
                              )
                          })
                        })
                    )
                  }
                },
                {
                  key: '_createDialog',
                  value: function (e, t, n) {
                    var r = 'UAS' === t ? e.to_tag : e.from_tag,
                      s = 'UAS' === t ? e.from_tag : e.to_tag,
                      i = e.call_id + r + s,
                      o = this._earlyDialogs[i]
                    if (n)
                      return (
                        !!o ||
                        ((o = new T(this, e, t, T.C.STATUS_EARLY)).error
                          ? (w.debug(o.error),
                            this._failed('remote', e, _.causes.INTERNAL_ERROR),
                            !1)
                          : ((this._earlyDialogs[i] = o), !0))
                      )
                    if (
                      ((this._from_tag = e.from_tag),
                      (this._to_tag = e.to_tag),
                      o)
                    )
                      return (
                        o.update(e, t),
                        (this._dialog = o),
                        delete this._earlyDialogs[i],
                        !0
                      )
                    var l = new T(this, e, t)
                    return l.error
                      ? (w.debug(l.error),
                        this._failed('remote', e, _.causes.INTERNAL_ERROR),
                        !1)
                      : ((this._dialog = l), !0)
                  }
                },
                {
                  key: '_receiveReinvite',
                  value: function (e) {
                    var t = this
                    w.debug('receiveReinvite()')
                    var n = e.hasHeader('Content-Type')
                        ? e.getHeader('Content-Type').toLowerCase()
                        : void 0,
                      r = {
                        request: e,
                        callback: void 0,
                        reject: function () {
                          var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : {}
                          s = !0
                          var n = t.status_code || 403,
                            r = t.reason_phrase || '',
                            i = v.cloneArray(t.extraHeaders)
                          if (this._status !== I.STATUS_CONFIRMED) return !1
                          if (n < 300 || n >= 700)
                            throw new TypeError(
                              'Invalid status_code: '.concat(n)
                            )
                          e.reply(n, r, i)
                        }.bind(this)
                      },
                      s = !1
                    if ((this.emit('reinvite', r), !s)) {
                      if (((this._late_sdp = !1), !e.body))
                        return (
                          (this._late_sdp = !0),
                          this._remoteHold &&
                            ((this._remoteHold = !1), this._onunhold('remote')),
                          void (this._connectionPromiseQueue = this._connectionPromiseQueue
                            .then(function () {
                              return t._createLocalDescription(
                                'offer',
                                t._rtcOfferConstraints
                              )
                            })
                            .then(function (e) {
                              i.call(t, e)
                            })
                            .catch(function () {
                              e.reply(500)
                            }))
                        )
                      if ('application/sdp' !== n)
                        return (
                          w.debug('invalid Content-Type'), void e.reply(415)
                        )
                      this._processInDialogSdpOffer(e)
                        .then(function (e) {
                          t._status !== I.STATUS_TERMINATED && i.call(t, e)
                        })
                        .catch(function (e) {
                          w.warn(e)
                        })
                    }
                    function i (t) {
                      var n = this,
                        s = ['Contact: '.concat(this._contact)]
                      this._handleSessionTimersInIncomingRequest(e, s),
                        this._late_sdp && (t = this._mangleOffer(t)),
                        e.reply(200, null, s, t, function () {
                          ;(n._status = I.STATUS_WAITING_FOR_ACK),
                            n._setInvite2xxTimer(e, t),
                            n._setACKTimer()
                        }),
                        'function' == typeof r.callback && r.callback()
                    }
                  }
                },
                {
                  key: '_receiveUpdate',
                  value: function (e) {
                    var t = this
                    w.debug('receiveUpdate()')
                    var n = e.hasHeader('Content-Type')
                        ? e.getHeader('Content-Type').toLowerCase()
                        : void 0,
                      r = {
                        request: e,
                        callback: void 0,
                        reject: function () {
                          var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : {}
                          s = !0
                          var n = t.status_code || 403,
                            r = t.reason_phrase || '',
                            i = v.cloneArray(t.extraHeaders)
                          if (this._status !== I.STATUS_CONFIRMED) return !1
                          if (n < 300 || n >= 700)
                            throw new TypeError(
                              'Invalid status_code: '.concat(n)
                            )
                          e.reply(n, r, i)
                        }.bind(this)
                      },
                      s = !1
                    if ((this.emit('update', r), !s))
                      if (e.body) {
                        if ('application/sdp' !== n)
                          return (
                            w.debug('invalid Content-Type'), void e.reply(415)
                          )
                        this._processInDialogSdpOffer(e)
                          .then(function (e) {
                            t._status !== I.STATUS_TERMINATED && i.call(t, e)
                          })
                          .catch(function (e) {
                            w.warn(e)
                          })
                      } else i.call(this, null)
                    function i (t) {
                      var n = ['Contact: '.concat(this._contact)]
                      this._handleSessionTimersInIncomingRequest(e, n),
                        e.reply(200, null, n, t),
                        'function' == typeof r.callback && r.callback()
                    }
                  }
                },
                {
                  key: '_processInDialogSdpOffer',
                  value: function (e) {
                    var t = this
                    w.debug('_processInDialogSdpOffer()')
                    var n,
                      r = e.parseSDP(),
                      i = !1,
                      o = s(r.media)
                    try {
                      for (o.s(); !(n = o.n()).done; ) {
                        var l = n.value
                        if (-1 !== O.indexOf(l.type)) {
                          var u = l.direction || r.direction || 'sendrecv'
                          if ('sendonly' !== u && 'inactive' !== u) {
                            i = !1
                            break
                          }
                          i = !0
                        }
                      }
                    } catch (e) {
                      o.e(e)
                    } finally {
                      o.f()
                    }
                    var a = { originator: 'remote', type: 'offer', sdp: e.body }
                    w.debug('emit "sdp"'), this.emit('sdp', a)
                    var c = new RTCSessionDescription({
                      type: 'offer',
                      sdp: a.sdp
                    })
                    return (
                      (this._connectionPromiseQueue = this._connectionPromiseQueue
                        .then(function () {
                          if (t._status === I.STATUS_TERMINATED)
                            throw new Error('terminated')
                          return t._connection
                            .setRemoteDescription(c)
                            .catch(function (n) {
                              throw (e.reply(488),
                              w.warn(
                                'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                n
                              ),
                              t.emit(
                                'peerconnection:setremotedescriptionfailed',
                                n
                              ),
                              n)
                            })
                        })
                        .then(function () {
                          if (t._status === I.STATUS_TERMINATED)
                            throw new Error('terminated')
                          !0 === t._remoteHold && !1 === i
                            ? ((t._remoteHold = !1), t._onunhold('remote'))
                            : !1 === t._remoteHold &&
                              !0 === i &&
                              ((t._remoteHold = !0), t._onhold('remote'))
                        })
                        .then(function () {
                          if (t._status === I.STATUS_TERMINATED)
                            throw new Error('terminated')
                          return t
                            ._createLocalDescription(
                              'answer',
                              t._rtcAnswerConstraints
                            )
                            .catch(function (t) {
                              throw (e.reply(500),
                              w.warn(
                                'emit "peerconnection:createtelocaldescriptionfailed" [error:%o]',
                                t
                              ),
                              t)
                            })
                        })
                        .catch(function (e) {
                          w.warn(
                            '_processInDialogSdpOffer() failed [error: %o]',
                            e
                          )
                        })),
                      this._connectionPromiseQueue
                    )
                  }
                },
                {
                  key: '_receiveRefer',
                  value: function (e) {
                    var t = this
                    if ((w.debug('receiveRefer()'), !e.refer_to))
                      return (
                        w.debug('no Refer-To header field present in REFER'),
                        void e.reply(400)
                      )
                    if (e.refer_to.uri.scheme !== _.SIP)
                      return (
                        w.debug(
                          'Refer-To header field points to a non-SIP URI scheme'
                        ),
                        void e.reply(416)
                      )
                    e.reply(202)
                    var r = new E(this, e.cseq)
                    w.debug('emit "refer"'),
                      this.emit('refer', {
                        request: e,
                        accept: function (s, i) {
                          ;(function (t) {
                            var s =
                              arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {}
                            if (
                              ((t = 'function' == typeof t ? t : null),
                              this._status !== I.STATUS_WAITING_FOR_ACK &&
                                this._status !== I.STATUS_CONFIRMED)
                            )
                              return !1
                            var i = new n(this._ua)
                            if (
                              (i.on('progress', function (e) {
                                var t = e.response
                                r.notify(t.status_code, t.reason_phrase)
                              }),
                              i.on('accepted', function (e) {
                                var t = e.response
                                r.notify(t.status_code, t.reason_phrase)
                              }),
                              i.on('_failed', function (e) {
                                var t = e.message,
                                  n = e.cause
                                t
                                  ? r.notify(t.status_code, t.reason_phrase)
                                  : r.notify(487, n)
                              }),
                              e.refer_to.uri.hasHeader('replaces'))
                            ) {
                              var o = decodeURIComponent(
                                e.refer_to.uri.getHeader('replaces')
                              )
                              ;(s.extraHeaders = v.cloneArray(s.extraHeaders)),
                                s.extraHeaders.push('Replaces: '.concat(o))
                            }
                            i.connect(e.refer_to.uri.toAor(), s, t)
                          }.call(t, s, i))
                        },
                        reject: function () {
                          ;(function () {
                            r.notify(603)
                          }.call(t))
                        }
                      })
                  }
                },
                {
                  key: '_receiveNotify',
                  value: function (e) {
                    switch (
                      (w.debug('receiveNotify()'),
                      e.event || e.reply(400),
                      e.event.event)
                    ) {
                      case 'refer':
                        var t, n
                        if (e.event.params && e.event.params.id)
                          (t = e.event.params.id),
                            (n = this._referSubscribers[t])
                        else {
                          if (1 !== Object.keys(this._referSubscribers).length)
                            return void e.reply(
                              400,
                              'Missing event id parameter'
                            )
                          n = this._referSubscribers[
                            Object.keys(this._referSubscribers)[0]
                          ]
                        }
                        if (!n)
                          return void e.reply(
                            481,
                            'Subscription does not exist'
                          )
                        n.receiveNotify(e), e.reply(200)
                        break
                      default:
                        e.reply(489)
                    }
                  }
                },
                {
                  key: '_receiveReplaces',
                  value: function (e) {
                    var t = this
                    w.debug('receiveReplaces()'),
                      this.emit('replaces', {
                        request: e,
                        accept: function (r) {
                          ;(function (t) {
                            var r = this
                            if (
                              this._status !== I.STATUS_WAITING_FOR_ACK &&
                              this._status !== I.STATUS_CONFIRMED
                            )
                              return !1
                            var s = new n(this._ua)
                            s.on('confirmed', function () {
                              r.terminate()
                            }),
                              s.init_incoming(e, t)
                          }.call(t, r))
                        },
                        reject: function () {
                          ;(function () {
                            w.debug('Replaced INVITE rejected by the user'),
                              e.reply(486)
                          }.call(t))
                        }
                      })
                  }
                },
                {
                  key: '_sendInitialRequest',
                  value: function (e, t, n) {
                    var r = this,
                      s = new C(this._ua, this._request, {
                        onRequestTimeout: function () {
                          r.onRequestTimeout()
                        },
                        onTransportError: function () {
                          r.onTransportError()
                        },
                        onAuthenticated: function (e) {
                          r._request = e
                        },
                        onReceiveResponse: function (e) {
                          r._receiveInviteResponse(e)
                        }
                      })
                    Promise.resolve()
                      .then(function () {
                        return (
                          n ||
                          (e.audio || e.video
                            ? ((r._localMediaStreamLocallyGenerated = !0),
                              navigator.mediaDevices
                                .getUserMedia(e)
                                .catch(function (e) {
                                  if (r._status === I.STATUS_TERMINATED)
                                    throw new Error('terminated')
                                  throw (r._failed(
                                    'local',
                                    null,
                                    _.causes.USER_DENIED_MEDIA_ACCESS
                                  ),
                                  w.warn(
                                    'emit "getusermediafailed" [error:%o]',
                                    e
                                  ),
                                  r.emit('getusermediafailed', e),
                                  e)
                                }))
                            : void 0)
                        )
                      })
                      .then(function (e) {
                        if (r._status === I.STATUS_TERMINATED)
                          throw new Error('terminated')
                        return (
                          (r._localMediaStream = e),
                          e &&
                            e.getTracks().forEach(function (t) {
                              r._connection.addTrack(t, e)
                            }),
                          r._connecting(r._request),
                          r
                            ._createLocalDescription('offer', t)
                            .catch(function (e) {
                              throw (r._failed(
                                'local',
                                null,
                                _.causes.WEBRTC_ERROR
                              ),
                              e)
                            })
                        )
                      })
                      .then(function (e) {
                        if (r._is_canceled || r._status === I.STATUS_TERMINATED)
                          throw new Error('terminated')
                        ;(r._request.body = e),
                          (r._status = I.STATUS_INVITE_SENT),
                          w.debug('emit "sending" [request:%o]', r._request),
                          r.emit('sending', { request: r._request }),
                          s.send()
                      })
                      .catch(function (e) {
                        r._status !== I.STATUS_TERMINATED && w.warn(e)
                      })
                  }
                },
                {
                  key: '_getDTMFRTPSender',
                  value: function () {
                    var e = this._connection.getSenders().find(function (e) {
                      return e.track && 'audio' === e.track.kind
                    })
                    if (e && e.dtmf) return e.dtmf
                    w.warn(
                      'sendDTMF() | no local audio track to send DTMF with'
                    )
                  }
                },
                {
                  key: '_receiveInviteResponse',
                  value: function (e) {
                    var t = this
                    if (
                      (w.debug('receiveInviteResponse()'),
                      this._dialog &&
                        e.status_code >= 200 &&
                        e.status_code <= 299)
                    ) {
                      if (
                        this._dialog.id.call_id === e.call_id &&
                        this._dialog.id.local_tag === e.from_tag &&
                        this._dialog.id.remote_tag === e.to_tag
                      )
                        return void this.sendRequest(_.ACK)
                      var n = new T(this, e, 'UAC')
                      return void 0 !== n.error
                        ? void w.debug(n.error)
                        : (this.sendRequest(_.ACK),
                          void this.sendRequest(_.BYE))
                    }
                    if (this._is_canceled)
                      e.status_code >= 100 && e.status_code < 200
                        ? this._request.cancel(this._cancel_reason)
                        : e.status_code >= 200 &&
                          e.status_code < 299 &&
                          this._acceptAndTerminate(e)
                    else if (
                      this._status === I.STATUS_INVITE_SENT ||
                      this._status === I.STATUS_1XX_RECEIVED
                    )
                      switch (!0) {
                        case /^100$/.test(e.status_code):
                          this._status = I.STATUS_1XX_RECEIVED
                          break
                        case /^1[0-9]{2}$/.test(e.status_code):
                          if (!e.to_tag) {
                            w.debug('1xx response received without to tag')
                            break
                          }
                          if (
                            e.hasHeader('contact') &&
                            !this._createDialog(e, 'UAC', !0)
                          )
                            break
                          if (
                            ((this._status = I.STATUS_1XX_RECEIVED), !e.body)
                          ) {
                            this._progress('remote', e)
                            break
                          }
                          var r = {
                            originator: 'remote',
                            type: 'answer',
                            sdp: e.body
                          }
                          w.debug('emit "sdp"'), this.emit('sdp', r)
                          var s = new RTCSessionDescription({
                            type: 'answer',
                            sdp: r.sdp
                          })
                          this._connectionPromiseQueue = this._connectionPromiseQueue
                            .then(function () {
                              return t._connection.setRemoteDescription(s)
                            })
                            .then(function () {
                              return t._progress('remote', e)
                            })
                            .catch(function (e) {
                              w.warn(
                                'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                e
                              ),
                                t.emit(
                                  'peerconnection:setremotedescriptionfailed',
                                  e
                                )
                            })
                          break
                        case /^2[0-9]{2}$/.test(e.status_code):
                          if (((this._status = I.STATUS_CONFIRMED), !e.body)) {
                            this._acceptAndTerminate(
                              e,
                              400,
                              _.causes.MISSING_SDP
                            ),
                              this._failed(
                                'remote',
                                e,
                                _.causes.BAD_MEDIA_DESCRIPTION
                              )
                            break
                          }
                          if (!this._createDialog(e, 'UAC')) break
                          var i = {
                            originator: 'remote',
                            type: 'answer',
                            sdp: e.body
                          }
                          w.debug('emit "sdp"'), this.emit('sdp', i)
                          var o = new RTCSessionDescription({
                            type: 'answer',
                            sdp: i.sdp
                          })
                          this._connectionPromiseQueue = this._connectionPromiseQueue
                            .then(function () {
                              if ('stable' === t._connection.signalingState)
                                return t._connection
                                  .createOffer(t._rtcOfferConstraints)
                                  .then(function (e) {
                                    console.log(e)
                                    return t._connection.setLocalDescription(e)
                                  })
                                  .catch(function (n) {
                                    t._acceptAndTerminate(e, 500, n.toString()),
                                      t._failed(
                                        'local',
                                        e,
                                        _.causes.WEBRTC_ERROR
                                      )
                                  })
                            })
                            .then(function () {
                              t._connection
                                .setRemoteDescription(o)
                                .then(function () {
                                  t._handleSessionTimersInIncomingResponse(e),
                                    t._accepted('remote', e),
                                    t.sendRequest(_.ACK),
                                    t._confirmed('local', null)
                                })
                                .catch(function (n) {
                                  t._acceptAndTerminate(
                                    e,
                                    488,
                                    'Not Acceptable Here'
                                  ),
                                    t._failed(
                                      'remote',
                                      e,
                                      _.causes.BAD_MEDIA_DESCRIPTION
                                    ),
                                    w.warn(
                                      'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                      n
                                    ),
                                    t.emit(
                                      'peerconnection:setremotedescriptionfailed',
                                      n
                                    )
                                })
                            })
                          break
                        default:
                          var l = v.sipErrorCause(e.status_code)
                          this._failed('remote', e, l)
                      }
                  }
                },
                {
                  key: '_sendReinvite',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    w.debug('sendReinvite()')
                    var n = v.cloneArray(t.extraHeaders),
                      r = v.cloneObject(t.eventHandlers),
                      s =
                        t.rtcOfferConstraints ||
                        this._rtcOfferConstraints ||
                        null,
                      i = !1
                    function o (e) {
                      r.failed && r.failed(e)
                    }
                    n.push('Contact: '.concat(this._contact)),
                      n.push('Content-Type: application/sdp'),
                      this._sessionTimers.running &&
                        n.push(
                          'Session-Expires: '
                            .concat(
                              this._sessionTimers.currentExpires,
                              ';refresher='
                            )
                            .concat(
                              this._sessionTimers.refresher ? 'uac' : 'uas'
                            )
                        ),
                      (this._connectionPromiseQueue = this._connectionPromiseQueue
                        .then(function () {
                          return e._createLocalDescription('offer', s)
                        })
                        .then(function (t) {
                          var s = {
                            originator: 'local',
                            type: 'offer',
                            sdp: (t = e._mangleOffer(t))
                          }
                          w.debug('emit "sdp"'),
                            e.emit('sdp', s),
                            e.sendRequest(_.INVITE, {
                              extraHeaders: n,
                              body: t,
                              eventHandlers: {
                                onSuccessResponse: function (t) {
                                  ;(function (e) {
                                    var t = this
                                    if (this._status === I.STATUS_TERMINATED)
                                      return
                                    if ((this.sendRequest(_.ACK), i)) return
                                    if (
                                      (this._handleSessionTimersInIncomingResponse(
                                        e
                                      ),
                                      !e.body)
                                    )
                                      return void o.call(this)
                                    if (
                                      !e.hasHeader('Content-Type') ||
                                      'application/sdp' !==
                                        e
                                          .getHeader('Content-Type')
                                          .toLowerCase()
                                    )
                                      return void o.call(this)
                                    var n = {
                                      originator: 'remote',
                                      type: 'answer',
                                      sdp: e.body
                                    }
                                    w.debug('emit "sdp"'), this.emit('sdp', n)
                                    var s = new RTCSessionDescription({
                                      type: 'answer',
                                      sdp: n.sdp
                                    })
                                    this._connectionPromiseQueue = this._connectionPromiseQueue
                                      .then(function () {
                                        return t._connection.setRemoteDescription(
                                          s
                                        )
                                      })
                                      .then(function () {
                                        r.succeeded && r.succeeded(e)
                                      })
                                      .catch(function (e) {
                                        o.call(t),
                                          w.warn(
                                            'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                            e
                                          ),
                                          t.emit(
                                            'peerconnection:setremotedescriptionfailed',
                                            e
                                          )
                                      })
                                  }.call(e, t),
                                    (i = !0))
                                },
                                onErrorResponse: function (t) {
                                  o.call(e, t)
                                },
                                onTransportError: function () {
                                  e.onTransportError()
                                },
                                onRequestTimeout: function () {
                                  e.onRequestTimeout()
                                },
                                onDialogError: function () {
                                  e.onDialogError()
                                }
                              }
                            })
                        })
                        .catch(function () {
                          o()
                        }))
                  }
                },
                {
                  key: '_sendUpdate',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    w.debug('sendUpdate()')
                    var n = v.cloneArray(t.extraHeaders),
                      r = v.cloneObject(t.eventHandlers),
                      s =
                        t.rtcOfferConstraints ||
                        this._rtcOfferConstraints ||
                        null,
                      i = t.sdpOffer || !1,
                      o = !1
                    function l (e) {
                      var t = this
                      if (this._status !== I.STATUS_TERMINATED && !o)
                        if (
                          (this._handleSessionTimersInIncomingResponse(e), i)
                        ) {
                          if (!e.body) return void u.call(this)
                          if (
                            !e.hasHeader('Content-Type') ||
                            'application/sdp' !==
                              e.getHeader('Content-Type').toLowerCase()
                          )
                            return void u.call(this)
                          var n = {
                            originator: 'remote',
                            type: 'answer',
                            sdp: e.body
                          }
                          w.debug('emit "sdp"'), this.emit('sdp', n)
                          var s = new RTCSessionDescription({
                            type: 'answer',
                            sdp: n.sdp
                          })
                          this._connectionPromiseQueue = this._connectionPromiseQueue
                            .then(function () {
                              return t._connection.setRemoteDescription(s)
                            })
                            .then(function () {
                              r.succeeded && r.succeeded(e)
                            })
                            .catch(function (e) {
                              u.call(t),
                                w.warn(
                                  'emit "peerconnection:setremotedescriptionfailed" [error:%o]',
                                  e
                                ),
                                t.emit(
                                  'peerconnection:setremotedescriptionfailed',
                                  e
                                )
                            })
                        } else r.succeeded && r.succeeded(e)
                    }
                    function u (e) {
                      r.failed && r.failed(e)
                    }
                    n.push('Contact: '.concat(this._contact)),
                      this._sessionTimers.running &&
                        n.push(
                          'Session-Expires: '
                            .concat(
                              this._sessionTimers.currentExpires,
                              ';refresher='
                            )
                            .concat(
                              this._sessionTimers.refresher ? 'uac' : 'uas'
                            )
                        ),
                      i
                        ? (n.push('Content-Type: application/sdp'),
                          (this._connectionPromiseQueue = this._connectionPromiseQueue
                            .then(function () {
                              return e._createLocalDescription('offer', s)
                            })
                            .then(function (t) {
                              var r = {
                                originator: 'local',
                                type: 'offer',
                                sdp: (t = e._mangleOffer(t))
                              }
                              w.debug('emit "sdp"'),
                                e.emit('sdp', r),
                                e.sendRequest(_.UPDATE, {
                                  extraHeaders: n,
                                  body: t,
                                  eventHandlers: {
                                    onSuccessResponse: function (t) {
                                      l.call(e, t), (o = !0)
                                    },
                                    onErrorResponse: function (t) {
                                      u.call(e, t)
                                    },
                                    onTransportError: function () {
                                      e.onTransportError()
                                    },
                                    onRequestTimeout: function () {
                                      e.onRequestTimeout()
                                    },
                                    onDialogError: function () {
                                      e.onDialogError()
                                    }
                                  }
                                })
                            })
                            .catch(function () {
                              u.call(e)
                            })))
                        : this.sendRequest(_.UPDATE, {
                            extraHeaders: n,
                            eventHandlers: {
                              onSuccessResponse: function (t) {
                                l.call(e, t)
                              },
                              onErrorResponse: function (t) {
                                u.call(e, t)
                              },
                              onTransportError: function () {
                                e.onTransportError()
                              },
                              onRequestTimeout: function () {
                                e.onRequestTimeout()
                              },
                              onDialogError: function () {
                                e.onDialogError()
                              }
                            }
                          })
                  }
                },
                {
                  key: '_acceptAndTerminate',
                  value: function (e, t, n) {
                    w.debug('acceptAndTerminate()')
                    var r = []
                    t &&
                      ((n = n || _.REASON_PHRASE[t] || ''),
                      r.push(
                        'Reason: SIP ;cause='
                          .concat(t, '; text="')
                          .concat(n, '"')
                      )),
                      (this._dialog || this._createDialog(e, 'UAC')) &&
                        (this.sendRequest(_.ACK),
                        this.sendRequest(_.BYE, { extraHeaders: r })),
                      (this._status = I.STATUS_TERMINATED)
                  }
                },
                {
                  key: '_mangleOffer',
                  value: function (e) {
                    if (!this._localHold && !this._remoteHold) return e
                    if (
                      ((e = d.parse(e)), this._localHold && !this._remoteHold)
                    ) {
                      w.debug('mangleOffer() | me on hold, mangling offer')
                      var t,
                        n = s(e.media)
                      try {
                        for (n.s(); !(t = n.n()).done; ) {
                          var r = t.value
                          ;-1 !== O.indexOf(r.type) &&
                            (r.direction
                              ? 'sendrecv' === r.direction
                                ? (r.direction = 'sendonly')
                                : 'recvonly' === r.direction &&
                                  (r.direction = 'inactive')
                              : (r.direction = 'sendonly'))
                        }
                      } catch (e) {
                        n.e(e)
                      } finally {
                        n.f()
                      }
                    } else if (this._localHold && this._remoteHold) {
                      w.debug('mangleOffer() | both on hold, mangling offer')
                      var i,
                        o = s(e.media)
                      try {
                        for (o.s(); !(i = o.n()).done; ) {
                          var l = i.value
                          ;-1 !== O.indexOf(l.type) &&
                            (l.direction = 'inactive')
                        }
                      } catch (e) {
                        o.e(e)
                      } finally {
                        o.f()
                      }
                    } else if (this._remoteHold) {
                      w.debug('mangleOffer() | remote on hold, mangling offer')
                      var u,
                        a = s(e.media)
                      try {
                        for (a.s(); !(u = a.n()).done; ) {
                          var c = u.value
                          ;-1 !== O.indexOf(c.type) &&
                            (c.direction
                              ? 'sendrecv' === c.direction
                                ? (c.direction = 'recvonly')
                                : 'recvonly' === c.direction &&
                                  (c.direction = 'inactive')
                              : (c.direction = 'recvonly'))
                        }
                      } catch (e) {
                        a.e(e)
                      } finally {
                        a.f()
                      }
                    }
                    return d.write(e)
                  }
                },
                {
                  key: '_setLocalMediaStatus',
                  value: function () {
                    var e = !0,
                      t = !0
                    ;(this._localHold || this._remoteHold) &&
                      ((e = !1), (t = !1)),
                      this._audioMuted && (e = !1),
                      this._videoMuted && (t = !1),
                      this._toggleMuteAudio(!e),
                      this._toggleMuteVideo(!t)
                  }
                },
                {
                  key: '_handleSessionTimersInIncomingRequest',
                  value: function (e, t) {
                    var n
                    this._sessionTimers.enabled &&
                      (e.session_expires &&
                      e.session_expires >= _.MIN_SESSION_EXPIRES
                        ? ((this._sessionTimers.currentExpires =
                            e.session_expires),
                          (n = e.session_expires_refresher || 'uas'))
                        : ((this._sessionTimers.currentExpires = this._sessionTimers.defaultExpires),
                          (n = 'uas')),
                      t.push(
                        'Session-Expires: '
                          .concat(
                            this._sessionTimers.currentExpires,
                            ';refresher='
                          )
                          .concat(n)
                      ),
                      (this._sessionTimers.refresher = 'uas' === n),
                      this._runSessionTimer())
                  }
                },
                {
                  key: '_handleSessionTimersInIncomingResponse',
                  value: function (e) {
                    var t
                    this._sessionTimers.enabled &&
                      (e.session_expires &&
                      e.session_expires >= _.MIN_SESSION_EXPIRES
                        ? ((this._sessionTimers.currentExpires =
                            e.session_expires),
                          (t = e.session_expires_refresher || 'uac'))
                        : ((this._sessionTimers.currentExpires = this._sessionTimers.defaultExpires),
                          (t = 'uac')),
                      (this._sessionTimers.refresher = 'uac' === t),
                      this._runSessionTimer())
                  }
                },
                {
                  key: '_runSessionTimer',
                  value: function () {
                    var e = this,
                      t = this._sessionTimers.currentExpires
                    ;(this._sessionTimers.running = !0),
                      clearTimeout(this._sessionTimers.timer),
                      this._sessionTimers.refresher
                        ? (this._sessionTimers.timer = setTimeout(function () {
                            e._status !== I.STATUS_TERMINATED &&
                              e._isReadyToReOffer() &&
                              (w.debug(
                                'runSessionTimer() | sending session refresh request'
                              ),
                              e._sessionTimers.refreshMethod === _.UPDATE
                                ? e._sendUpdate()
                                : e._sendReinvite())
                          }, 500 * t))
                        : (this._sessionTimers.timer = setTimeout(function () {
                            e._status !== I.STATUS_TERMINATED &&
                              (w.warn(
                                'runSessionTimer() | timer expired, terminating the session'
                              ),
                              e.terminate({
                                cause: _.causes.REQUEST_TIMEOUT,
                                status_code: 408,
                                reason_phrase: 'Session Timer Expired'
                              }))
                          }, 1100 * t))
                  }
                },
                {
                  key: '_toggleMuteAudio',
                  value: function (e) {
                    var t,
                      n = s(
                        this._connection.getSenders().filter(function (e) {
                          return e.track && 'audio' === e.track.kind
                        })
                      )
                    try {
                      for (n.s(); !(t = n.n()).done; ) {
                        t.value.track.enabled = !e
                      }
                    } catch (e) {
                      n.e(e)
                    } finally {
                      n.f()
                    }
                  }
                },
                {
                  key: '_toggleMuteVideo',
                  value: function (e) {
                    var t,
                      n = s(
                        this._connection.getSenders().filter(function (e) {
                          return e.track && 'video' === e.track.kind
                        })
                      )
                    try {
                      for (n.s(); !(t = n.n()).done; ) {
                        t.value.track.enabled = !e
                      }
                    } catch (e) {
                      n.e(e)
                    } finally {
                      n.f()
                    }
                  }
                },
                {
                  key: '_newRTCSession',
                  value: function (e, t) {
                    w.debug('newRTCSession()'),
                      this._ua.newRTCSession(this, {
                        originator: e,
                        session: this,
                        request: t
                      })
                  }
                },
                {
                  key: '_connecting',
                  value: function (e) {
                    w.debug('session connecting'),
                      w.debug('emit "connecting"'),
                      this.emit('connecting', { request: e })
                  }
                },
                {
                  key: '_progress',
                  value: function (e, t) {
                    w.debug('session progress'),
                      w.debug('emit "progress"'),
                      this.emit('progress', {
                        originator: e,
                        response: t || null
                      })
                  }
                },
                {
                  key: '_accepted',
                  value: function (e, t) {
                    w.debug('session accepted'),
                      (this._start_time = new Date()),
                      w.debug('emit "accepted"'),
                      this.emit('accepted', {
                        originator: e,
                        response: t || null
                      })
                  }
                },
                {
                  key: '_confirmed',
                  value: function (e, t) {
                    w.debug('session confirmed'),
                      (this._is_confirmed = !0),
                      w.debug('emit "confirmed"'),
                      this.emit('confirmed', { originator: e, ack: t || null })
                  }
                },
                {
                  key: '_ended',
                  value: function (e, t, n) {
                    w.debug('session ended'),
                      (this._end_time = new Date()),
                      this._close(),
                      w.debug('emit "ended"'),
                      this.emit('ended', {
                        originator: e,
                        message: t || null,
                        cause: n
                      })
                  }
                },
                {
                  key: '_failed',
                  value: function (e, t, n) {
                    w.debug('session failed'),
                      w.debug('emit "_failed"'),
                      this.emit('_failed', {
                        originator: e,
                        message: t || null,
                        cause: n
                      }),
                      this._close(),
                      w.debug('emit "failed"'),
                      this.emit('failed', {
                        originator: e,
                        message: t || null,
                        cause: n
                      })
                  }
                },
                {
                  key: '_onhold',
                  value: function (e) {
                    w.debug('session onhold'),
                      this._setLocalMediaStatus(),
                      w.debug('emit "hold"'),
                      this.emit('hold', { originator: e })
                  }
                },
                {
                  key: '_onunhold',
                  value: function (e) {
                    w.debug('session onunhold'),
                      this._setLocalMediaStatus(),
                      w.debug('emit "unhold"'),
                      this.emit('unhold', { originator: e })
                  }
                },
                {
                  key: '_onmute',
                  value: function (e) {
                    var t = e.audio,
                      n = e.video
                    w.debug('session onmute'),
                      this._setLocalMediaStatus(),
                      w.debug('emit "muted"'),
                      this.emit('muted', { audio: t, video: n })
                  }
                },
                {
                  key: '_onunmute',
                  value: function (e) {
                    var t = e.audio,
                      n = e.video
                    w.debug('session onunmute'),
                      this._setLocalMediaStatus(),
                      w.debug('emit "unmuted"'),
                      this.emit('unmuted', { audio: t, video: n })
                  }
                },
                {
                  key: 'C',
                  get: function () {
                    return I
                  }
                },
                {
                  key: 'causes',
                  get: function () {
                    return _.causes
                  }
                },
                {
                  key: 'id',
                  get: function () {
                    return this._id
                  }
                },
                {
                  key: 'connection',
                  get: function () {
                    return this._connection
                  }
                },
                {
                  key: 'contact',
                  get: function () {
                    return this._contact
                  }
                },
                {
                  key: 'direction',
                  get: function () {
                    return this._direction
                  }
                },
                {
                  key: 'local_identity',
                  get: function () {
                    return this._local_identity
                  }
                },
                {
                  key: 'remote_identity',
                  get: function () {
                    return this._remote_identity
                  }
                },
                {
                  key: 'start_time',
                  get: function () {
                    return this._start_time
                  }
                },
                {
                  key: 'end_time',
                  get: function () {
                    return this._end_time
                  }
                },
                {
                  key: 'data',
                  get: function () {
                    return this._data
                  },
                  set: function (e) {
                    this._data = e
                  }
                },
                {
                  key: 'status',
                  get: function () {
                    return this._status
                  }
                }
              ]),
              n
            )
          })()
        },
        {
          './Constants': 2,
          './Dialog': 3,
          './Exceptions': 6,
          './Logger': 9,
          './RTCSession/DTMF': 15,
          './RTCSession/Info': 16,
          './RTCSession/ReferNotifier': 17,
          './RTCSession/ReferSubscriber': 18,
          './RequestSender': 20,
          './SIPMessage': 21,
          './Timers': 23,
          './Transactions': 24,
          './URI': 27,
          './Utils': 28,
          events: 31,
          'sdp-transform': 37
        }
      ],
      15: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var u = e('events').EventEmitter,
            a = e('../Logger'),
            c = e('../Constants'),
            h = e('../Exceptions'),
            d = e('../Utils'),
            f = new a('RTCSession:DTMF'),
            _ = {
              MIN_DURATION: 70,
              MAX_DURATION: 6e3,
              DEFAULT_DURATION: 100,
              MIN_INTER_TONE_GAP: 50,
              DEFAULT_INTER_TONE_GAP: 500
            }
          ;(t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && i(e, t)
            })(a, u)
            var t,
              n,
              r,
              l = o(a)
            function a (e) {
              var t
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, a),
                ((t = l.call(this))._session = e),
                (t._direction = null),
                (t._tone = null),
                (t._duration = null),
                (t._request = null),
                t
              )
            }
            return (
              (t = a),
              (n = [
                {
                  key: 'send',
                  value: function (e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {}
                    if (void 0 === e)
                      throw new TypeError('Not enough arguments')
                    if (
                      ((this._direction = 'outgoing'),
                      this._session.status !==
                        this._session.C.STATUS_CONFIRMED &&
                        this._session.status !==
                          this._session.C.STATUS_WAITING_FOR_ACK)
                    )
                      throw new h.InvalidStateError(this._session.status)
                    var r = d.cloneArray(n.extraHeaders)
                    if (
                      ((this.eventHandlers = d.cloneObject(n.eventHandlers)),
                      'string' == typeof e)
                    )
                      e = e.toUpperCase()
                    else {
                      if ('number' != typeof e)
                        throw new TypeError('Invalid tone: '.concat(e))
                      e = e.toString()
                    }
                    if (!e.match(/^[0-9A-DR#*]$/))
                      throw new TypeError('Invalid tone: '.concat(e))
                    ;(this._tone = e),
                      (this._duration = n.duration),
                      r.push('Content-Type: application/dtmf-relay')
                    var s = 'Signal='.concat(this._tone, '\r\n')
                    ;(s += 'Duration='.concat(this._duration)),
                      this._session.newDTMF({
                        originator: 'local',
                        dtmf: this,
                        request: this._request
                      }),
                      this._session.sendRequest(c.INFO, {
                        extraHeaders: r,
                        eventHandlers: {
                          onSuccessResponse: function (e) {
                            t.emit('succeeded', {
                              originator: 'remote',
                              response: e
                            })
                          },
                          onErrorResponse: function (e) {
                            t.eventHandlers.onFailed &&
                              t.eventHandlers.onFailed(),
                              t.emit('failed', {
                                originator: 'remote',
                                response: e
                              })
                          },
                          onRequestTimeout: function () {
                            t._session.onRequestTimeout()
                          },
                          onTransportError: function () {
                            t._session.onTransportError()
                          },
                          onDialogError: function () {
                            t._session.onDialogError()
                          }
                        },
                        body: s
                      })
                  }
                },
                {
                  key: 'init_incoming',
                  value: function (e) {
                    var t = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,
                      n = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/
                    if (
                      ((this._direction = 'incoming'),
                      (this._request = e),
                      e.reply(200),
                      e.body)
                    ) {
                      var r = e.body.split('\n')
                      r.length >= 1 &&
                        t.test(r[0]) &&
                        (this._tone = r[0].replace(t, '$2')),
                        r.length >= 2 &&
                          n.test(r[1]) &&
                          (this._duration = parseInt(r[1].replace(n, '$2'), 10))
                    }
                    this._duration || (this._duration = _.DEFAULT_DURATION),
                      this._tone
                        ? this._session.newDTMF({
                            originator: 'remote',
                            dtmf: this,
                            request: e
                          })
                        : f.debug('invalid INFO DTMF received, discarded')
                  }
                },
                {
                  key: 'tone',
                  get: function () {
                    return this._tone
                  }
                },
                {
                  key: 'duration',
                  get: function () {
                    return this._duration
                  }
                }
              ]) && s(t.prototype, n),
              r && s(t, r),
              a
            )
          })()),
            (t.exports.C = _)
        },
        {
          '../Constants': 2,
          '../Exceptions': 6,
          '../Logger': 9,
          '../Utils': 28,
          events: 31
        }
      ],
      16: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var u = e('events').EventEmitter,
            a = e('../Constants'),
            c = e('../Exceptions'),
            h = e('../Utils')
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && i(e, t)
            })(d, u)
            var t,
              n,
              r,
              l = o(d)
            function d (e) {
              var t
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, d),
                ((t = l.call(this))._session = e),
                (t._direction = null),
                (t._contentType = null),
                (t._body = null),
                t
              )
            }
            return (
              (t = d),
              (n = [
                {
                  key: 'send',
                  value: function (e, t) {
                    var n = this,
                      r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {}
                    if (((this._direction = 'outgoing'), void 0 === e))
                      throw new TypeError('Not enough arguments')
                    if (
                      this._session.status !==
                        this._session.C.STATUS_CONFIRMED &&
                      this._session.status !==
                        this._session.C.STATUS_WAITING_FOR_ACK
                    )
                      throw new c.InvalidStateError(this._session.status)
                    ;(this._contentType = e), (this._body = t)
                    var s = h.cloneArray(r.extraHeaders)
                    s.push('Content-Type: '.concat(e)),
                      this._session.newInfo({
                        originator: 'local',
                        info: this,
                        request: this.request
                      }),
                      this._session.sendRequest(a.INFO, {
                        extraHeaders: s,
                        eventHandlers: {
                          onSuccessResponse: function (e) {
                            n.emit('succeeded', {
                              originator: 'remote',
                              response: e
                            })
                          },
                          onErrorResponse: function (e) {
                            n.emit('failed', {
                              originator: 'remote',
                              response: e
                            })
                          },
                          onTransportError: function () {
                            n._session.onTransportError()
                          },
                          onRequestTimeout: function () {
                            n._session.onRequestTimeout()
                          },
                          onDialogError: function () {
                            n._session.onDialogError()
                          }
                        },
                        body: t
                      })
                  }
                },
                {
                  key: 'init_incoming',
                  value: function (e) {
                    ;(this._direction = 'incoming'),
                      (this.request = e),
                      e.reply(200),
                      (this._contentType = e.hasHeader('Content-Type')
                        ? e.getHeader('Content-Type').toLowerCase()
                        : void 0),
                      (this._body = e.body),
                      this._session.newInfo({
                        originator: 'remote',
                        info: this,
                        request: e
                      })
                  }
                },
                {
                  key: 'contentType',
                  get: function () {
                    return this._contentType
                  }
                },
                {
                  key: 'body',
                  get: function () {
                    return this._body
                  }
                }
              ]) && s(t.prototype, n),
              r && s(t, r),
              d
            )
          })()
        },
        { '../Constants': 2, '../Exceptions': 6, '../Utils': 28, events: 31 }
      ],
      17: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('../Logger'),
            i = e('../Constants'),
            o = new s('RTCSession:ReferNotifier'),
            l = {
              event_type: 'refer',
              body_type: 'message/sipfrag;version=2.0',
              expires: 300
            }
          t.exports = (function () {
            function e (t, n, r) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                (this._session = t),
                (this._id = n),
                (this._expires = r || l.expires),
                (this._active = !0),
                this.notify(100)
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'notify',
                  value: function (e, t) {
                    var n
                    ;(o.debug('notify()'), !1 !== this._active) &&
                      ((t = t || i.REASON_PHRASE[e] || ''),
                      (n =
                        e >= 200
                          ? 'terminated;reason=noresource'
                          : 'active;expires='.concat(this._expires)),
                      this._session.sendRequest(i.NOTIFY, {
                        extraHeaders: [
                          'Event: '
                            .concat(l.event_type, ';id=')
                            .concat(this._id),
                          'Subscription-State: '.concat(n),
                          'Content-Type: '.concat(l.body_type)
                        ],
                        body: 'SIP/2.0 '.concat(e, ' ').concat(t),
                        eventHandlers: {
                          onErrorResponse: function () {
                            this._active = !1
                          }
                        }
                      }))
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        { '../Constants': 2, '../Logger': 9 }
      ],
      18: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var u = e('events').EventEmitter,
            a = e('../Logger'),
            c = e('../Constants'),
            h = e('../Grammar'),
            d = e('../Utils'),
            f = new a('RTCSession:ReferSubscriber')
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && i(e, t)
            })(a, u)
            var t,
              n,
              r,
              l = o(a)
            function a (e) {
              var t
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, a),
                ((t = l.call(this))._id = null),
                (t._session = e),
                t
              )
            }
            return (
              (t = a),
              (n = [
                {
                  key: 'sendRefer',
                  value: function (e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {}
                    f.debug('sendRefer()')
                    var r = d.cloneArray(n.extraHeaders),
                      s = d.cloneObject(n.eventHandlers)
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        this.on(i, s[i])
                    var o = null
                    n.replaces &&
                      ((o = n.replaces._request.call_id),
                      (o += ';to-tag='.concat(n.replaces._to_tag)),
                      (o += ';from-tag='.concat(n.replaces._from_tag)),
                      (o = encodeURIComponent(o)))
                    var l = 'Refer-To: <'
                      .concat(e)
                      .concat(o ? '?Replaces='.concat(o) : '', '>')
                    if (
                      (r.push(l),
                      !r.some(function (e) {
                        return e.toLowerCase().startsWith('referred-by:')
                      }))
                    ) {
                      var u = 'Referred-By: <'
                        .concat(
                          this._session._ua._configuration.uri._scheme,
                          ':'
                        )
                        .concat(this._session._ua._configuration.uri._user, '@')
                        .concat(this._session._ua._configuration.uri._host, '>')
                      r.push(u)
                    }
                    r.push('Contact: '.concat(this._session.contact))
                    var a = this._session.sendRequest(c.REFER, {
                      extraHeaders: r,
                      eventHandlers: {
                        onSuccessResponse: function (e) {
                          t._requestSucceeded(e)
                        },
                        onErrorResponse: function (e) {
                          t._requestFailed(e, c.causes.REJECTED)
                        },
                        onTransportError: function () {
                          t._requestFailed(null, c.causes.CONNECTION_ERROR)
                        },
                        onRequestTimeout: function () {
                          t._requestFailed(null, c.causes.REQUEST_TIMEOUT)
                        },
                        onDialogError: function () {
                          t._requestFailed(null, c.causes.DIALOG_ERROR)
                        }
                      }
                    })
                    this._id = a.cseq
                  }
                },
                {
                  key: 'receiveNotify',
                  value: function (e) {
                    if ((f.debug('receiveNotify()'), e.body)) {
                      var t = h.parse(e.body.trim(), 'Status_Line')
                      if (-1 !== t)
                        switch (!0) {
                          case /^100$/.test(t.status_code):
                            this.emit('trying', { request: e, status_line: t })
                            break
                          case /^1[0-9]{2}$/.test(t.status_code):
                            this.emit('progress', {
                              request: e,
                              status_line: t
                            })
                            break
                          case /^2[0-9]{2}$/.test(t.status_code):
                            this.emit('accepted', {
                              request: e,
                              status_line: t
                            })
                            break
                          default:
                            this.emit('failed', { request: e, status_line: t })
                        }
                      else
                        f.debug(
                          'receiveNotify() | error parsing NOTIFY body: "'.concat(
                            e.body,
                            '"'
                          )
                        )
                    }
                  }
                },
                {
                  key: '_requestSucceeded',
                  value: function (e) {
                    f.debug('REFER succeeded'),
                      f.debug('emit "requestSucceeded"'),
                      this.emit('requestSucceeded', { response: e })
                  }
                },
                {
                  key: '_requestFailed',
                  value: function (e, t) {
                    f.debug('REFER failed'),
                      f.debug('emit "requestFailed"'),
                      this.emit('requestFailed', {
                        response: e || null,
                        cause: t
                      })
                  }
                },
                {
                  key: 'id',
                  get: function () {
                    return this._id
                  }
                }
              ]) && s(t.prototype, n),
              r && s(t, r),
              a
            )
          })()
        },
        {
          '../Constants': 2,
          '../Grammar': 7,
          '../Logger': 9,
          '../Utils': 28,
          events: 31
        }
      ],
      19: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('./Logger'),
            i = e('./Utils'),
            o = e('./Constants'),
            l = e('./SIPMessage'),
            u = e('./RequestSender'),
            a = new s('Registrator')
          t.exports = (function () {
            function e (t, n) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                (this._reg_id = 1),
                (this._ua = t),
                (this._transport = n),
                (this._registrar = t.configuration.registrar_server),
                (this._expires = t.configuration.register_expires),
                (this._call_id = i.createRandomToken(22)),
                (this._cseq = 0),
                (this._to_uri = t.configuration.uri),
                (this._registrationTimer = null),
                (this._registering = !1),
                (this._registered = !1),
                (this._contact = this._ua.contact.toString()),
                (this._contact += ';+sip.ice'),
                (this._extraHeaders = []),
                (this._extraContactParams = ''),
                (this._sipInstance = '"<urn:uuid:'.concat(
                  this._ua.configuration.instance_id,
                  '>"'
                )),
                (this._contact += ';reg-id='.concat(this._reg_id)),
                (this._contact += ';+sip.instance='.concat(this._sipInstance))
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'setExtraHeaders',
                  value: function (e) {
                    Array.isArray(e) || (e = []),
                      (this._extraHeaders = e.slice())
                  }
                },
                {
                  key: 'setExtraContactParams',
                  value: function (e) {
                    for (var t in (e instanceof Object || (e = {}),
                    (this._extraContactParams = ''),
                    e))
                      if (Object.prototype.hasOwnProperty.call(e, t)) {
                        var n = e[t]
                        ;(this._extraContactParams += ';'.concat(t)),
                          n && (this._extraContactParams += '='.concat(n))
                      }
                  }
                },
                {
                  key: 'register',
                  value: function () {
                    var e = this
                    if (this._registering)
                      a.debug('Register request in progress...')
                    else {
                      var t = this._extraHeaders.slice()
                      t.push(
                        'Contact: '
                          .concat(this._contact, ';expires=')
                          .concat(this._expires)
                          .concat(this._extraContactParams)
                      ),
                        t.push('Expires: '.concat(this._expires))
                      var n = new l.OutgoingRequest(
                          o.REGISTER,
                          this._registrar,
                          this._ua,
                          {
                            to_uri: this._to_uri,
                            call_id: this._call_id,
                            cseq: (this._cseq += 1)
                          },
                          t
                        ),
                        r = new u(this._ua, n, {
                          onRequestTimeout: function () {
                            e._registrationFailure(
                              null,
                              o.causes.REQUEST_TIMEOUT
                            )
                          },
                          onTransportError: function () {
                            e._registrationFailure(
                              null,
                              o.causes.CONNECTION_ERROR
                            )
                          },
                          onAuthenticated: function () {
                            e._cseq += 1
                          },
                          onReceiveResponse: function (t) {
                            if (t.cseq === e._cseq)
                              switch (
                                (null !== e._registrationTimer &&
                                  (clearTimeout(e._registrationTimer),
                                  (e._registrationTimer = null)),
                                !0)
                              ) {
                                case /^1[0-9]{2}$/.test(t.status_code):
                                  break
                                case /^2[0-9]{2}$/.test(t.status_code):
                                  if (
                                    ((e._registering = !1),
                                    !t.hasHeader('Contact'))
                                  ) {
                                    a.debug(
                                      'no Contact header in response to REGISTER, response ignored'
                                    )
                                    break
                                  }
                                  var n = t.headers.Contact.reduce(function (
                                      e,
                                      t
                                    ) {
                                      return e.concat(t.parsed)
                                    },
                                    []),
                                    r = n.find(function (t) {
                                      return (
                                        e._sipInstance ===
                                          t.getParam('+sip.instance') &&
                                        e._reg_id ===
                                          parseInt(t.getParam('reg-id'))
                                      )
                                    })
                                  if (
                                    (r ||
                                      (r = n.find(function (t) {
                                        return (
                                          t.uri.user === e._ua.contact.uri.user
                                        )
                                      })),
                                    !r)
                                  ) {
                                    a.debug(
                                      'no Contact header pointing to us, response ignored'
                                    )
                                    break
                                  }
                                  var s = r.getParam('expires')
                                  !s &&
                                    t.hasHeader('expires') &&
                                    (s = t.getHeader('expires')),
                                    s || (s = e._expires),
                                    (s = Number(s)) < 10 && (s = 10)
                                  var l =
                                    s > 64
                                      ? (1e3 * s) / 2 +
                                        Math.floor(
                                          1e3 * (s / 2 - 32) * Math.random()
                                        )
                                      : 1e3 * s - 5e3
                                  ;(e._registrationTimer = setTimeout(
                                    function () {
                                      ;(e._registrationTimer = null),
                                        0 ===
                                        e._ua.listeners('registrationExpiring')
                                          .length
                                          ? e.register()
                                          : e._ua.emit('registrationExpiring')
                                    },
                                    l
                                  )),
                                    r.hasParam('temp-gruu') &&
                                      (e._ua.contact.temp_gruu = r
                                        .getParam('temp-gruu')
                                        .replace(/"/g, '')),
                                    r.hasParam('pub-gruu') &&
                                      (e._ua.contact.pub_gruu = r
                                        .getParam('pub-gruu')
                                        .replace(/"/g, '')),
                                    e._registered ||
                                      ((e._registered = !0),
                                      e._ua.registered({ response: t }))
                                  break
                                case /^423$/.test(t.status_code):
                                  t.hasHeader('min-expires')
                                    ? ((e._expires = Number(
                                        t.getHeader('min-expires')
                                      )),
                                      e._expires < 10 && (e._expires = 10),
                                      e.register())
                                    : (a.debug(
                                        '423 response received for REGISTER without Min-Expires'
                                      ),
                                      e._registrationFailure(
                                        t,
                                        o.causes.SIP_FAILURE_CODE
                                      ))
                                  break
                                default:
                                  var u = i.sipErrorCause(t.status_code)
                                  e._registrationFailure(t, u)
                              }
                          }
                        })
                      ;(this._registering = !0), r.send()
                    }
                  }
                },
                {
                  key: 'unregister',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    if (this._registered) {
                      ;(this._registered = !1),
                        null !== this._registrationTimer &&
                          (clearTimeout(this._registrationTimer),
                          (this._registrationTimer = null))
                      var n = this._extraHeaders.slice()
                      t.all
                        ? n.push('Contact: *'.concat(this._extraContactParams))
                        : n.push(
                            'Contact: '
                              .concat(this._contact, ';expires=0')
                              .concat(this._extraContactParams)
                          ),
                        n.push('Expires: 0')
                      var r = new l.OutgoingRequest(
                        o.REGISTER,
                        this._registrar,
                        this._ua,
                        {
                          to_uri: this._to_uri,
                          call_id: this._call_id,
                          cseq: (this._cseq += 1)
                        },
                        n
                      )
                      new u(this._ua, r, {
                        onRequestTimeout: function () {
                          e._unregistered(null, o.causes.REQUEST_TIMEOUT)
                        },
                        onTransportError: function () {
                          e._unregistered(null, o.causes.CONNECTION_ERROR)
                        },
                        onAuthenticated: function () {
                          e._cseq += 1
                        },
                        onReceiveResponse: function (t) {
                          switch (!0) {
                            case /^1[0-9]{2}$/.test(t.status_code):
                              break
                            case /^2[0-9]{2}$/.test(t.status_code):
                              e._unregistered(t)
                              break
                            default:
                              var n = i.sipErrorCause(t.status_code)
                              e._unregistered(t, n)
                          }
                        }
                      }).send()
                    } else a.debug('already unregistered')
                  }
                },
                {
                  key: 'close',
                  value: function () {
                    this._registered && this.unregister()
                  }
                },
                {
                  key: 'onTransportClosed',
                  value: function () {
                    ;(this._registering = !1),
                      null !== this._registrationTimer &&
                        (clearTimeout(this._registrationTimer),
                        (this._registrationTimer = null)),
                      this._registered &&
                        ((this._registered = !1), this._ua.unregistered({}))
                  }
                },
                {
                  key: '_registrationFailure',
                  value: function (e, t) {
                    ;(this._registering = !1),
                      this._ua.registrationFailed({
                        response: e || null,
                        cause: t
                      }),
                      this._registered &&
                        ((this._registered = !1),
                        this._ua.unregistered({
                          response: e || null,
                          cause: t
                        }))
                  }
                },
                {
                  key: '_unregistered',
                  value: function (e, t) {
                    ;(this._registering = !1),
                      (this._registered = !1),
                      this._ua.unregistered({
                        response: e || null,
                        cause: t || null
                      })
                  }
                },
                {
                  key: 'registered',
                  get: function () {
                    return this._registered
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        {
          './Constants': 2,
          './Logger': 9,
          './RequestSender': 20,
          './SIPMessage': 21,
          './Utils': 28
        }
      ],
      20: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('./Logger'),
            i = e('./Constants'),
            o = e('./DigestAuthentication'),
            l = e('./Transactions'),
            u = new s('RequestSender'),
            a = {
              onRequestTimeout: function () {},
              onTransportError: function () {},
              onReceiveResponse: function () {},
              onAuthenticated: function () {}
            }
          t.exports = (function () {
            function e (t, n, r) {
              for (var s in ((function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
              (this._ua = t),
              (this._eventHandlers = r),
              (this._method = n.method),
              (this._request = n),
              (this._auth = null),
              (this._challenged = !1),
              (this._staled = !1),
              a))
                Object.prototype.hasOwnProperty.call(a, s) &&
                  (this._eventHandlers[s] || (this._eventHandlers[s] = a[s]))
              t.status !== t.C.STATUS_USER_CLOSED ||
                (this._method === i.BYE && this._method === i.ACK) ||
                this._eventHandlers.onTransportError()
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'send',
                  value: function () {
                    var e = this,
                      t = {
                        onRequestTimeout: function () {
                          e._eventHandlers.onRequestTimeout()
                        },
                        onTransportError: function () {
                          e._eventHandlers.onTransportError()
                        },
                        onReceiveResponse: function (t) {
                          e._receiveResponse(t)
                        }
                      }
                    switch (this._method) {
                      case 'INVITE':
                        this.clientTransaction = new l.InviteClientTransaction(
                          this._ua,
                          this._ua.transport,
                          this._request,
                          t
                        )
                        break
                      case 'ACK':
                        this.clientTransaction = new l.AckClientTransaction(
                          this._ua,
                          this._ua.transport,
                          this._request,
                          t
                        )
                        break
                      default:
                        this.clientTransaction = new l.NonInviteClientTransaction(
                          this._ua,
                          this._ua.transport,
                          this._request,
                          t
                        )
                    }
                    this._ua._configuration.authorization_jwt &&
                      this._request.setHeader(
                        'Authorization',
                        this._ua._configuration.authorization_jwt
                      ),
                      this.clientTransaction.send()
                  }
                },
                {
                  key: '_receiveResponse',
                  value: function (e) {
                    var t,
                      n,
                      r = e.status_code
                    if (
                      (401 !== r && 407 !== r) ||
                      (null === this._ua.configuration.password &&
                        null === this._ua.configuration.ha1)
                    )
                      this._eventHandlers.onReceiveResponse(e)
                    else {
                      if (
                        (401 === e.status_code
                          ? ((t = e.parseHeader('www-authenticate')),
                            (n = 'authorization'))
                          : ((t = e.parseHeader('proxy-authenticate')),
                            (n = 'proxy-authorization')),
                        !t)
                      )
                        return (
                          u.debug(
                            ''.concat(
                              e.status_code,
                              ' with wrong or missing challenge, cannot authenticate'
                            )
                          ),
                          void this._eventHandlers.onReceiveResponse(e)
                        )
                      if (
                        !this._challenged ||
                        (!this._staled && !0 === t.stale)
                      ) {
                        if (
                          (this._auth ||
                            (this._auth = new o({
                              username: this._ua.configuration
                                .authorization_user,
                              password: this._ua.configuration.password,
                              realm: this._ua.configuration.realm,
                              ha1: this._ua.configuration.ha1
                            })),
                          !this._auth.authenticate(this._request, t))
                        )
                          return void this._eventHandlers.onReceiveResponse(e)
                        ;(this._challenged = !0),
                          this._ua.set('realm', this._auth.get('realm')),
                          this._ua.set('ha1', this._auth.get('ha1')),
                          t.stale && (this._staled = !0),
                          (this._request = this._request.clone()),
                          (this._request.cseq += 1),
                          this._request.setHeader(
                            'cseq',
                            ''
                              .concat(this._request.cseq, ' ')
                              .concat(this._method)
                          ),
                          this._request.setHeader(n, this._auth.toString()),
                          this._eventHandlers.onAuthenticated(this._request),
                          this.send()
                      } else this._eventHandlers.onReceiveResponse(e)
                    }
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        {
          './Constants': 2,
          './DigestAuthentication': 5,
          './Logger': 9,
          './Transactions': 24
        }
      ],
      21: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && i(e, t)
          }
          function i (e, t) {
            return (i =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function o (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = l(e)
              if (t) {
                var i = l(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return e
                })(e)
              })(this, n)
            }
          }
          function l (e) {
            return (l = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          function u (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return a(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return a(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  s = function () {}
                return {
                  s: s,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: s
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var i,
              o = !0,
              l = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (o = e.done), e
              },
              e: function (e) {
                ;(l = !0), (i = e)
              },
              f: function () {
                try {
                  o || null == n.return || n.return()
                } finally {
                  if (l) throw i
                }
              }
            }
          }
          function a (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          function c (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function')
          }
          function h (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function d (e, t, n) {
            return t && h(e.prototype, t), n && h(e, n), e
          }
          var f = e('sdp-transform'),
            _ = e('./Logger'),
            p = e('./Constants'),
            m = e('./Utils'),
            v = e('./NameAddrHeader'),
            g = e('./Grammar'),
            y = new _('SIPMessage'),
            T = (function () {
              function e (t, n, r, s, i, o) {
                if ((c(this, e), !t || !n || !r)) return null
                ;(s = s || {}),
                  (this.ua = r),
                  (this.headers = {}),
                  (this.method = t),
                  (this.ruri = n),
                  (this.body = o),
                  (this.extraHeaders = m.cloneArray(i)),
                  s.route_set
                    ? this.setHeader('route', s.route_set)
                    : r.configuration.use_preloaded_route &&
                      this.setHeader(
                        'route',
                        '<'.concat(r.transport.sip_uri, ';lr>')
                      ),
                  this.setHeader('via', ''),
                  this.setHeader('max-forwards', p.MAX_FORWARDS)
                var l = s.to_uri || n,
                  u = s.to_tag ? { tag: s.to_tag } : null,
                  a = void 0 !== s.to_display_name ? s.to_display_name : null
                ;(this.to = new v(l, a, u)),
                  this.setHeader('to', this.to.toString())
                var h,
                  d = s.from_uri || r.configuration.uri,
                  f = { tag: s.from_tag || m.newTag() }
                ;(h =
                  void 0 !== s.from_display_name
                    ? s.from_display_name
                    : r.configuration.display_name
                    ? r.configuration.display_name
                    : null),
                  (this.from = new v(d, h, f)),
                  this.setHeader('from', this.from.toString())
                var _ =
                  s.call_id ||
                  r.configuration.jssip_id + m.createRandomToken(15)
                ;(this.call_id = _), this.setHeader('call-id', _)
                var g = s.cseq || Math.floor(1e4 * Math.random())
                ;(this.cseq = g),
                  this.setHeader('cseq', ''.concat(g, ' ').concat(t))
              }
              return (
                d(e, [
                  {
                    key: 'setHeader',
                    value: function (e, t) {
                      for (
                        var n = new RegExp('^\\s*'.concat(e, '\\s*:'), 'i'),
                          r = 0;
                        r < this.extraHeaders.length;
                        r++
                      )
                        n.test(this.extraHeaders[r]) &&
                          this.extraHeaders.splice(r, 1)
                      this.headers[m.headerize(e)] = Array.isArray(t) ? t : [t]
                    }
                  },
                  {
                    key: 'getHeader',
                    value: function (e) {
                      var t = this.headers[m.headerize(e)]
                      if (t) {
                        if (t[0]) return t[0]
                      } else {
                        var n,
                          r = new RegExp('^\\s*'.concat(e, '\\s*:'), 'i'),
                          s = u(this.extraHeaders)
                        try {
                          for (s.s(); !(n = s.n()).done; ) {
                            var i = n.value
                            if (r.test(i))
                              return i.substring(i.indexOf(':') + 1).trim()
                          }
                        } catch (e) {
                          s.e(e)
                        } finally {
                          s.f()
                        }
                      }
                    }
                  },
                  {
                    key: 'getHeaders',
                    value: function (e) {
                      var t = this.headers[m.headerize(e)],
                        n = []
                      if (t) {
                        var r,
                          s = u(t)
                        try {
                          for (s.s(); !(r = s.n()).done; ) {
                            var i = r.value
                            n.push(i)
                          }
                        } catch (e) {
                          s.e(e)
                        } finally {
                          s.f()
                        }
                        return n
                      }
                      var o,
                        l = new RegExp('^\\s*'.concat(e, '\\s*:'), 'i'),
                        a = u(this.extraHeaders)
                      try {
                        for (a.s(); !(o = a.n()).done; ) {
                          var c = o.value
                          l.test(c) &&
                            n.push(c.substring(c.indexOf(':') + 1).trim())
                        }
                      } catch (e) {
                        a.e(e)
                      } finally {
                        a.f()
                      }
                      return n
                    }
                  },
                  {
                    key: 'hasHeader',
                    value: function (e) {
                      if (this.headers[m.headerize(e)]) return !0
                      var t,
                        n = new RegExp('^\\s*'.concat(e, '\\s*:'), 'i'),
                        r = u(this.extraHeaders)
                      try {
                        for (r.s(); !(t = r.n()).done; ) {
                          var s = t.value
                          if (n.test(s)) return !0
                        }
                      } catch (e) {
                        r.e(e)
                      } finally {
                        r.f()
                      }
                      return !1
                    }
                  },
                  {
                    key: 'parseSDP',
                    value: function (e) {
                      return !e && this.sdp
                        ? this.sdp
                        : ((this.sdp = f.parse(this.body || '')), this.sdp)
                    }
                  },
                  {
                    key: 'toString',
                    value: function () {
                      var e = ''
                        .concat(this.method, ' ')
                        .concat(this.ruri, ' SIP/2.0\r\n')
                      for (var t in this.headers)
                        if (
                          Object.prototype.hasOwnProperty.call(this.headers, t)
                        ) {
                          var n,
                            r = u(this.headers[t])
                          try {
                            for (r.s(); !(n = r.n()).done; ) {
                              var s = n.value
                              e += ''.concat(t, ': ').concat(s, '\r\n')
                            }
                          } catch (e) {
                            r.e(e)
                          } finally {
                            r.f()
                          }
                        }
                      var i,
                        o = u(this.extraHeaders)
                      try {
                        for (o.s(); !(i = o.n()).done; ) {
                          var l = i.value
                          e += ''.concat(l.trim(), '\r\n')
                        }
                      } catch (e) {
                        o.e(e)
                      } finally {
                        o.f()
                      }
                      var a = []
                      switch (this.method) {
                        case p.REGISTER:
                          a.push('path', 'gruu')
                          break
                        case p.INVITE:
                          this.ua.configuration.session_timers &&
                            a.push('timer'),
                            (this.ua.contact.pub_gruu ||
                              this.ua.contact.temp_gruu) &&
                              a.push('gruu'),
                            a.push('ice', 'replaces')
                          break
                        case p.UPDATE:
                          this.ua.configuration.session_timers &&
                            a.push('timer'),
                            a.push('ice')
                      }
                      a.push('outbound')
                      var c = this.ua.configuration.user_agent || p.USER_AGENT
                      if (
                        ((e += 'Allow: '.concat(p.ALLOWED_METHODS, '\r\n')),
                        (e += 'Supported: '.concat(a, '\r\n')),
                        (e += 'User-Agent: '.concat(c, '\r\n')),
                        this.body)
                      ) {
                        var h = m.str_utf8_length(this.body)
                        ;(e += 'Content-Length: '.concat(h, '\r\n\r\n')),
                          (e += this.body)
                      } else e += 'Content-Length: 0\r\n\r\n'
                      return e
                    }
                  },
                  {
                    key: 'clone',
                    value: function () {
                      var t = new e(this.method, this.ruri, this.ua)
                      return (
                        Object.keys(this.headers).forEach(function (e) {
                          t.headers[e] = this.headers[e].slice()
                        }, this),
                        (t.body = this.body),
                        (t.extraHeaders = m.cloneArray(this.extraHeaders)),
                        (t.to = this.to),
                        (t.from = this.from),
                        (t.call_id = this.call_id),
                        (t.cseq = this.cseq),
                        t
                      )
                    }
                  }
                ]),
                e
              )
            })(),
            C = (function (e) {
              s(n, T)
              var t = o(n)
              function n (e, r, s, i, o) {
                var l
                return (
                  c(this, n),
                  ((l = t.call(
                    this,
                    p.INVITE,
                    e,
                    r,
                    s,
                    i,
                    o
                  )).transaction = null),
                  l
                )
              }
              return (
                d(n, [
                  {
                    key: 'cancel',
                    value: function (e) {
                      this.transaction.cancel(e)
                    }
                  },
                  {
                    key: 'clone',
                    value: function () {
                      var e = new n(this.ruri, this.ua)
                      return (
                        Object.keys(this.headers).forEach(function (t) {
                          e.headers[t] = this.headers[t].slice()
                        }, this),
                        (e.body = this.body),
                        (e.extraHeaders = m.cloneArray(this.extraHeaders)),
                        (e.to = this.to),
                        (e.from = this.from),
                        (e.call_id = this.call_id),
                        (e.cseq = this.cseq),
                        (e.transaction = this.transaction),
                        e
                      )
                    }
                  }
                ]),
                n
              )
            })(),
            b = (function () {
              function e () {
                c(this, e),
                  (this.data = null),
                  (this.headers = null),
                  (this.method = null),
                  (this.via = null),
                  (this.via_branch = null),
                  (this.call_id = null),
                  (this.cseq = null),
                  (this.from = null),
                  (this.from_tag = null),
                  (this.to = null),
                  (this.to_tag = null),
                  (this.body = null),
                  (this.sdp = null)
              }
              return (
                d(e, [
                  {
                    key: 'addHeader',
                    value: function (e, t) {
                      var n = { raw: t }
                      ;(e = m.headerize(e)),
                        this.headers[e]
                          ? this.headers[e].push(n)
                          : (this.headers[e] = [n])
                    }
                  },
                  {
                    key: 'getHeader',
                    value: function (e) {
                      var t = this.headers[m.headerize(e)]
                      if (t) return t[0] ? t[0].raw : void 0
                    }
                  },
                  {
                    key: 'getHeaders',
                    value: function (e) {
                      var t = this.headers[m.headerize(e)],
                        n = []
                      if (!t) return []
                      var r,
                        s = u(t)
                      try {
                        for (s.s(); !(r = s.n()).done; ) {
                          var i = r.value
                          n.push(i.raw)
                        }
                      } catch (e) {
                        s.e(e)
                      } finally {
                        s.f()
                      }
                      return n
                    }
                  },
                  {
                    key: 'hasHeader',
                    value: function (e) {
                      return !!this.headers[m.headerize(e)]
                    }
                  },
                  {
                    key: 'parseHeader',
                    value: function (e) {
                      var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 0
                      if (((e = m.headerize(e)), this.headers[e])) {
                        if (!(t >= this.headers[e].length)) {
                          var n = this.headers[e][t],
                            r = n.raw
                          if (n.parsed) return n.parsed
                          var s = g.parse(r, e.replace(/-/g, '_'))
                          return -1 === s
                            ? (this.headers[e].splice(t, 1),
                              void y.debug(
                                'error parsing "'
                                  .concat(e, '" header field with value "')
                                  .concat(r, '"')
                              ))
                            : ((n.parsed = s), s)
                        }
                        y.debug('not so many "'.concat(e, '" headers present'))
                      } else y.debug('header "'.concat(e, '" not present'))
                    }
                  },
                  {
                    key: 's',
                    value: function (e, t) {
                      return this.parseHeader(e, t)
                    }
                  },
                  {
                    key: 'setHeader',
                    value: function (e, t) {
                      var n = { raw: t }
                      this.headers[m.headerize(e)] = [n]
                    }
                  },
                  {
                    key: 'parseSDP',
                    value: function (e) {
                      return !e && this.sdp
                        ? this.sdp
                        : ((this.sdp = f.parse(this.body || '')), this.sdp)
                    }
                  },
                  {
                    key: 'toString',
                    value: function () {
                      return this.data
                    }
                  }
                ]),
                e
              )
            })(),
            S = (function (e) {
              s(n, b)
              var t = o(n)
              function n (e) {
                var r
                return (
                  c(this, n),
                  ((r = t.call(this)).ua = e),
                  (r.headers = {}),
                  (r.ruri = null),
                  (r.transport = null),
                  (r.server_transaction = null),
                  r
                )
              }
              return (
                d(n, [
                  {
                    key: 'reply',
                    value: function (e, t, n, r, s, i) {
                      var o = [],
                        l = this.getHeader('To')
                      if (
                        ((t = t || null),
                        !(e = e || null) || e < 100 || e > 699)
                      )
                        throw new TypeError('Invalid status_code: '.concat(e))
                      if (t && 'string' != typeof t && !(t instanceof String))
                        throw new TypeError('Invalid reason_phrase: '.concat(t))
                      ;(t = t || p.REASON_PHRASE[e] || ''),
                        (n = m.cloneArray(n))
                      var a = 'SIP/2.0 '.concat(e, ' ').concat(t, '\r\n')
                      if (this.method === p.INVITE && e > 100 && e <= 200) {
                        var c,
                          h = u(this.getHeaders('record-route'))
                        try {
                          for (h.s(); !(c = h.n()).done; ) {
                            var d = c.value
                            a += 'Record-Route: '.concat(d, '\r\n')
                          }
                        } catch (e) {
                          h.e(e)
                        } finally {
                          h.f()
                        }
                      }
                      var f,
                        _ = u(this.getHeaders('via'))
                      try {
                        for (_.s(); !(f = _.n()).done; ) {
                          var v = f.value
                          a += 'Via: '.concat(v, '\r\n')
                        }
                      } catch (e) {
                        _.e(e)
                      } finally {
                        _.f()
                      }
                      !this.to_tag && e > 100
                        ? (l += ';tag='.concat(m.newTag()))
                        : this.to_tag &&
                          !this.s('to').hasParam('tag') &&
                          (l += ';tag='.concat(this.to_tag)),
                        (a += 'To: '.concat(l, '\r\n')),
                        (a += 'From: '.concat(this.getHeader('From'), '\r\n')),
                        (a += 'Call-ID: '.concat(this.call_id, '\r\n')),
                        (a += 'CSeq: '
                          .concat(this.cseq, ' ')
                          .concat(this.method, '\r\n'))
                      var g,
                        y = u(n)
                      try {
                        for (y.s(); !(g = y.n()).done; ) {
                          var T = g.value
                          a += ''.concat(T.trim(), '\r\n')
                        }
                      } catch (e) {
                        y.e(e)
                      } finally {
                        y.f()
                      }
                      switch (this.method) {
                        case p.INVITE:
                          this.ua.configuration.session_timers &&
                            o.push('timer'),
                            (this.ua.contact.pub_gruu ||
                              this.ua.contact.temp_gruu) &&
                              o.push('gruu'),
                            o.push('ice', 'replaces')
                          break
                        case p.UPDATE:
                          this.ua.configuration.session_timers &&
                            o.push('timer'),
                            r && o.push('ice'),
                            o.push('replaces')
                      }
                      if (
                        (o.push('outbound'),
                        this.method === p.OPTIONS
                          ? ((a += 'Allow: '.concat(p.ALLOWED_METHODS, '\r\n')),
                            (a += 'Accept: '.concat(
                              p.ACCEPTED_BODY_TYPES,
                              '\r\n'
                            )))
                          : 405 === e
                          ? (a += 'Allow: '.concat(p.ALLOWED_METHODS, '\r\n'))
                          : 415 === e &&
                            (a += 'Accept: '.concat(
                              p.ACCEPTED_BODY_TYPES,
                              '\r\n'
                            )),
                        (a += 'Supported: '.concat(o, '\r\n')),
                        r)
                      ) {
                        var C = m.str_utf8_length(r)
                        ;(a += 'Content-Type: application/sdp\r\n'),
                          (a += 'Content-Length: '.concat(C, '\r\n\r\n')),
                          (a += r)
                      } else a += 'Content-Length: '.concat(0, '\r\n\r\n')
                      this.server_transaction.receiveResponse(e, a, s, i)
                    }
                  },
                  {
                    key: 'reply_sl',
                    value: function () {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : null,
                        t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : null,
                        n = this.getHeaders('via')
                      if (!e || e < 100 || e > 699)
                        throw new TypeError('Invalid status_code: '.concat(e))
                      if (t && 'string' != typeof t && !(t instanceof String))
                        throw new TypeError('Invalid reason_phrase: '.concat(t))
                      t = t || p.REASON_PHRASE[e] || ''
                      var r,
                        s = 'SIP/2.0 '.concat(e, ' ').concat(t, '\r\n'),
                        i = u(n)
                      try {
                        for (i.s(); !(r = i.n()).done; ) {
                          var o = r.value
                          s += 'Via: '.concat(o, '\r\n')
                        }
                      } catch (e) {
                        i.e(e)
                      } finally {
                        i.f()
                      }
                      var l = this.getHeader('To')
                      !this.to_tag && e > 100
                        ? (l += ';tag='.concat(m.newTag()))
                        : this.to_tag &&
                          !this.s('to').hasParam('tag') &&
                          (l += ';tag='.concat(this.to_tag)),
                        (s += 'To: '.concat(l, '\r\n')),
                        (s += 'From: '.concat(this.getHeader('From'), '\r\n')),
                        (s += 'Call-ID: '.concat(this.call_id, '\r\n')),
                        (s += 'CSeq: '
                          .concat(this.cseq, ' ')
                          .concat(this.method, '\r\n')),
                        (s += 'Content-Length: '.concat(0, '\r\n\r\n')),
                        this.transport.send(s)
                    }
                  }
                ]),
                n
              )
            })(),
            E = (function (e) {
              s(n, b)
              var t = o(n)
              function n () {
                var e
                return (
                  c(this, n),
                  ((e = t.call(this)).headers = {}),
                  (e.status_code = null),
                  (e.reason_phrase = null),
                  e
                )
              }
              return n
            })()
          t.exports = {
            OutgoingRequest: T,
            InitialOutgoingInviteRequest: C,
            IncomingRequest: S,
            IncomingResponse: E
          }
        },
        {
          './Constants': 2,
          './Grammar': 7,
          './Logger': 9,
          './NameAddrHeader': 11,
          './Utils': 28,
          'sdp-transform': 37
        }
      ],
      22: [
        function (e, t, n) {
          'use strict'
          var r = e('./Logger'),
            s = e('./Utils'),
            i = e('./Grammar'),
            o = new r('Socket')
          n.isSocket = function (e) {
            if (Array.isArray(e)) return !1
            if (void 0 === e)
              return o.warn('undefined JsSIP.Socket instance'), !1
            try {
              if (!s.isString(e.url))
                throw (o.warn('missing or invalid JsSIP.Socket url property'),
                new Error('Missing or invalid JsSIP.Socket url property'))
              if (!s.isString(e.via_transport))
                throw (o.warn(
                  'missing or invalid JsSIP.Socket via_transport property'
                ),
                new Error(
                  'Missing or invalid JsSIP.Socket via_transport property'
                ))
              if (-1 === i.parse(e.sip_uri, 'SIP_URI'))
                throw (o.warn(
                  'missing or invalid JsSIP.Socket sip_uri property'
                ),
                new Error('missing or invalid JsSIP.Socket sip_uri property'))
            } catch (e) {
              return !1
            }
            try {
              ;['connect', 'disconnect', 'send'].forEach(function (t) {
                if (!s.isFunction(e[t]))
                  throw (o.warn(
                    'missing or invalid JsSIP.Socket method: '.concat(t)
                  ),
                  new Error(
                    'Missing or invalid JsSIP.Socket method: '.concat(t)
                  ))
              })
            } catch (e) {
              return !1
            }
            return !0
          }
        },
        { './Grammar': 7, './Logger': 9, './Utils': 28 }
      ],
      23: [
        function (e, t, n) {
          'use strict'
          var r = 500
          t.exports = {
            T1: r,
            T2: 4e3,
            T4: 5e3,
            TIMER_B: 32e3,
            TIMER_D: 0,
            TIMER_F: 32e3,
            TIMER_H: 32e3,
            TIMER_I: 0,
            TIMER_J: 0,
            TIMER_K: 0,
            TIMER_L: 32e3,
            TIMER_M: 32e3,
            PROVISIONAL_RESPONSE_INTERVAL: 6e4
          }
        },
        {}
      ],
      24: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function')
          }
          function i (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function o (e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e
          }
          function l (e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 }
            })),
              t && u(e, t)
          }
          function u (e, t) {
            return (u =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function a (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = h(e)
              if (t) {
                var i = h(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return c(e)
              })(this, n)
            }
          }
          function c (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            return e
          }
          function h (e) {
            return (h = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var d = e('events').EventEmitter,
            f = e('./Logger'),
            _ = e('./Constants'),
            p = e('./SIPMessage'),
            m = e('./Timers'),
            v = new f('NonInviteClientTransaction'),
            g = new f('InviteClientTransaction'),
            y = new f('AckClientTransaction'),
            T = new f('NonInviteServerTransaction'),
            C = new f('InviteServerTransaction'),
            b = {
              STATUS_TRYING: 1,
              STATUS_PROCEEDING: 2,
              STATUS_CALLING: 3,
              STATUS_ACCEPTED: 4,
              STATUS_COMPLETED: 5,
              STATUS_TERMINATED: 6,
              STATUS_CONFIRMED: 7,
              NON_INVITE_CLIENT: 'nict',
              NON_INVITE_SERVER: 'nist',
              INVITE_CLIENT: 'ict',
              INVITE_SERVER: 'ist'
            },
            S = (function (e) {
              l(n, d)
              var t = a(n)
              function n (e, r, i, o) {
                var l
                s(this, n),
                  ((l = t.call(this)).type = b.NON_INVITE_CLIENT),
                  (l.id = 'z9hG4bK'.concat(Math.floor(1e7 * Math.random()))),
                  (l.ua = e),
                  (l.transport = r),
                  (l.request = i),
                  (l.eventHandlers = o)
                var u = 'SIP/2.0/'.concat(r.via_transport)
                return (
                  (u += ' '
                    .concat(e.configuration.via_host, ';branch=')
                    .concat(l.id)),
                  l.request.setHeader('via', u),
                  l.ua.newTransaction(c(l)),
                  l
                )
              }
              return (
                o(n, [
                  {
                    key: 'stateChanged',
                    value: function (e) {
                      ;(this.state = e), this.emit('stateChanged')
                    }
                  },
                  {
                    key: 'send',
                    value: function () {
                      var e = this
                      this.stateChanged(b.STATUS_TRYING),
                        (this.F = setTimeout(function () {
                          e.timer_F()
                        }, m.TIMER_F)),
                        this.transport.send(this.request) ||
                          this.onTransportError()
                    }
                  },
                  {
                    key: 'onTransportError',
                    value: function () {
                      v.debug(
                        'transport error occurred, deleting transaction '.concat(
                          this.id
                        )
                      ),
                        clearTimeout(this.F),
                        clearTimeout(this.K),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this),
                        this.eventHandlers.onTransportError()
                    }
                  },
                  {
                    key: 'timer_F',
                    value: function () {
                      v.debug(
                        'Timer F expired for transaction '.concat(this.id)
                      ),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this),
                        this.eventHandlers.onRequestTimeout()
                    }
                  },
                  {
                    key: 'timer_K',
                    value: function () {
                      this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'receiveResponse',
                    value: function (e) {
                      var t = this,
                        n = e.status_code
                      if (n < 200)
                        switch (this.state) {
                          case b.STATUS_TRYING:
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_PROCEEDING),
                              this.eventHandlers.onReceiveResponse(e)
                        }
                      else
                        switch (this.state) {
                          case b.STATUS_TRYING:
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_COMPLETED),
                              clearTimeout(this.F),
                              408 === n
                                ? this.eventHandlers.onRequestTimeout()
                                : this.eventHandlers.onReceiveResponse(e),
                              (this.K = setTimeout(function () {
                                t.timer_K()
                              }, m.TIMER_K))
                            break
                          case b.STATUS_COMPLETED:
                        }
                    }
                  },
                  {
                    key: 'C',
                    get: function () {
                      return b
                    }
                  }
                ]),
                n
              )
            })(),
            E = (function (e) {
              l(n, d)
              var t = a(n)
              function n (e, r, i, o) {
                var l
                s(this, n),
                  ((l = t.call(this)).type = b.INVITE_CLIENT),
                  (l.id = 'z9hG4bK'.concat(Math.floor(1e7 * Math.random()))),
                  (l.ua = e),
                  (l.transport = r),
                  (l.request = i),
                  (l.eventHandlers = o),
                  (i.transaction = c(l))
                var u = 'SIP/2.0/'.concat(r.via_transport)
                return (
                  (u += ' '
                    .concat(e.configuration.via_host, ';branch=')
                    .concat(l.id)),
                  l.request.setHeader('via', u),
                  l.ua.newTransaction(c(l)),
                  l
                )
              }
              return (
                o(n, [
                  {
                    key: 'stateChanged',
                    value: function (e) {
                      ;(this.state = e), this.emit('stateChanged')
                    }
                  },
                  {
                    key: 'send',
                    value: function () {
                      var e = this
                      this.stateChanged(b.STATUS_CALLING),
                        (this.B = setTimeout(function () {
                          e.timer_B()
                        }, m.TIMER_B)),
                        this.transport.send(this.request) ||
                          this.onTransportError()
                    }
                  },
                  {
                    key: 'onTransportError',
                    value: function () {
                      clearTimeout(this.B),
                        clearTimeout(this.D),
                        clearTimeout(this.M),
                        this.state !== b.STATUS_ACCEPTED &&
                          (g.debug(
                            'transport error occurred, deleting transaction '.concat(
                              this.id
                            )
                          ),
                          this.eventHandlers.onTransportError()),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'timer_M',
                    value: function () {
                      g.debug(
                        'Timer M expired for transaction '.concat(this.id)
                      ),
                        this.state === b.STATUS_ACCEPTED &&
                          (clearTimeout(this.B),
                          this.stateChanged(b.STATUS_TERMINATED),
                          this.ua.destroyTransaction(this))
                    }
                  },
                  {
                    key: 'timer_B',
                    value: function () {
                      g.debug(
                        'Timer B expired for transaction '.concat(this.id)
                      ),
                        this.state === b.STATUS_CALLING &&
                          (this.stateChanged(b.STATUS_TERMINATED),
                          this.ua.destroyTransaction(this),
                          this.eventHandlers.onRequestTimeout())
                    }
                  },
                  {
                    key: 'timer_D',
                    value: function () {
                      g.debug(
                        'Timer D expired for transaction '.concat(this.id)
                      ),
                        clearTimeout(this.B),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'sendACK',
                    value: function (e) {
                      var t = this,
                        n = new p.OutgoingRequest(
                          _.ACK,
                          this.request.ruri,
                          this.ua,
                          {
                            route_set: this.request.getHeaders('route'),
                            call_id: this.request.getHeader('call-id'),
                            cseq: this.request.cseq
                          }
                        )
                      n.setHeader('from', this.request.getHeader('from')),
                        n.setHeader('via', this.request.getHeader('via')),
                        n.setHeader('to', e.getHeader('to')),
                        (this.D = setTimeout(function () {
                          t.timer_D()
                        }, m.TIMER_D)),
                        this.transport.send(n)
                    }
                  },
                  {
                    key: 'cancel',
                    value: function (e) {
                      if (this.state === b.STATUS_PROCEEDING) {
                        var t = new p.OutgoingRequest(
                          _.CANCEL,
                          this.request.ruri,
                          this.ua,
                          {
                            route_set: this.request.getHeaders('route'),
                            call_id: this.request.getHeader('call-id'),
                            cseq: this.request.cseq
                          }
                        )
                        t.setHeader('from', this.request.getHeader('from')),
                          t.setHeader('via', this.request.getHeader('via')),
                          t.setHeader('to', this.request.getHeader('to')),
                          e && t.setHeader('reason', e),
                          this.transport.send(t)
                      }
                    }
                  },
                  {
                    key: 'receiveResponse',
                    value: function (e) {
                      var t = this,
                        n = e.status_code
                      if (n >= 100 && n <= 199)
                        switch (this.state) {
                          case b.STATUS_CALLING:
                            this.stateChanged(b.STATUS_PROCEEDING),
                              this.eventHandlers.onReceiveResponse(e)
                            break
                          case b.STATUS_PROCEEDING:
                            this.eventHandlers.onReceiveResponse(e)
                        }
                      else if (n >= 200 && n <= 299)
                        switch (this.state) {
                          case b.STATUS_CALLING:
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_ACCEPTED),
                              (this.M = setTimeout(function () {
                                t.timer_M()
                              }, m.TIMER_M)),
                              this.eventHandlers.onReceiveResponse(e)
                            break
                          case b.STATUS_ACCEPTED:
                            this.eventHandlers.onReceiveResponse(e)
                        }
                      else if (n >= 300 && n <= 699)
                        switch (this.state) {
                          case b.STATUS_CALLING:
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_COMPLETED),
                              this.sendACK(e),
                              this.eventHandlers.onReceiveResponse(e)
                            break
                          case b.STATUS_COMPLETED:
                            this.sendACK(e)
                        }
                    }
                  },
                  {
                    key: 'C',
                    get: function () {
                      return b
                    }
                  }
                ]),
                n
              )
            })(),
            A = (function (e) {
              l(n, d)
              var t = a(n)
              function n (e, r, i, o) {
                var l
                s(this, n),
                  ((l = t.call(this)).id = 'z9hG4bK'.concat(
                    Math.floor(1e7 * Math.random())
                  )),
                  (l.transport = r),
                  (l.request = i),
                  (l.eventHandlers = o)
                var u = 'SIP/2.0/'.concat(r.via_transport)
                return (
                  (u += ' '
                    .concat(e.configuration.via_host, ';branch=')
                    .concat(l.id)),
                  l.request.setHeader('via', u),
                  l
                )
              }
              return (
                o(n, [
                  {
                    key: 'send',
                    value: function () {
                      this.transport.send(this.request) ||
                        this.onTransportError()
                    }
                  },
                  {
                    key: 'onTransportError',
                    value: function () {
                      y.debug(
                        'transport error occurred for transaction '.concat(
                          this.id
                        )
                      ),
                        this.eventHandlers.onTransportError()
                    }
                  },
                  {
                    key: 'C',
                    get: function () {
                      return b
                    }
                  }
                ]),
                n
              )
            })(),
            R = (function (e) {
              l(n, d)
              var t = a(n)
              function n (e, r, i) {
                var o
                return (
                  s(this, n),
                  ((o = t.call(this)).type = b.NON_INVITE_SERVER),
                  (o.id = i.via_branch),
                  (o.ua = e),
                  (o.transport = r),
                  (o.request = i),
                  (o.last_response = ''),
                  (i.server_transaction = c(o)),
                  (o.state = b.STATUS_TRYING),
                  e.newTransaction(c(o)),
                  o
                )
              }
              return (
                o(n, [
                  {
                    key: 'stateChanged',
                    value: function (e) {
                      ;(this.state = e), this.emit('stateChanged')
                    }
                  },
                  {
                    key: 'timer_J',
                    value: function () {
                      T.debug(
                        'Timer J expired for transaction '.concat(this.id)
                      ),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'onTransportError',
                    value: function () {
                      this.transportError ||
                        ((this.transportError = !0),
                        T.debug(
                          'transport error occurred, deleting transaction '.concat(
                            this.id
                          )
                        ),
                        clearTimeout(this.J),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this))
                    }
                  },
                  {
                    key: 'receiveResponse',
                    value: function (e, t, n, r) {
                      var s = this
                      if (100 === e)
                        switch (this.state) {
                          case b.STATUS_TRYING:
                            this.stateChanged(b.STATUS_PROCEEDING),
                              this.transport.send(t) || this.onTransportError()
                            break
                          case b.STATUS_PROCEEDING:
                            ;(this.last_response = t),
                              this.transport.send(t)
                                ? n && n()
                                : (this.onTransportError(), r && r())
                        }
                      else if (e >= 200 && e <= 699)
                        switch (this.state) {
                          case b.STATUS_TRYING:
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_COMPLETED),
                              (this.last_response = t),
                              (this.J = setTimeout(function () {
                                s.timer_J()
                              }, m.TIMER_J)),
                              this.transport.send(t)
                                ? n && n()
                                : (this.onTransportError(), r && r())
                            break
                          case b.STATUS_COMPLETED:
                        }
                    }
                  },
                  {
                    key: 'C',
                    get: function () {
                      return b
                    }
                  }
                ]),
                n
              )
            })(),
            w = (function (e) {
              l(n, d)
              var t = a(n)
              function n (e, r, i) {
                var o
                return (
                  s(this, n),
                  ((o = t.call(this)).type = b.INVITE_SERVER),
                  (o.id = i.via_branch),
                  (o.ua = e),
                  (o.transport = r),
                  (o.request = i),
                  (o.last_response = ''),
                  (i.server_transaction = c(o)),
                  (o.state = b.STATUS_PROCEEDING),
                  e.newTransaction(c(o)),
                  (o.resendProvisionalTimer = null),
                  i.reply(100),
                  o
                )
              }
              return (
                o(n, [
                  {
                    key: 'stateChanged',
                    value: function (e) {
                      ;(this.state = e), this.emit('stateChanged')
                    }
                  },
                  {
                    key: 'timer_H',
                    value: function () {
                      C.debug(
                        'Timer H expired for transaction '.concat(this.id)
                      ),
                        this.state === b.STATUS_COMPLETED &&
                          C.debug(
                            'ACK not received, dialog will be terminated'
                          ),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'timer_I',
                    value: function () {
                      this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this)
                    }
                  },
                  {
                    key: 'timer_L',
                    value: function () {
                      C.debug(
                        'Timer L expired for transaction '.concat(this.id)
                      ),
                        this.state === b.STATUS_ACCEPTED &&
                          (this.stateChanged(b.STATUS_TERMINATED),
                          this.ua.destroyTransaction(this))
                    }
                  },
                  {
                    key: 'onTransportError',
                    value: function () {
                      this.transportError ||
                        ((this.transportError = !0),
                        C.debug(
                          'transport error occurred, deleting transaction '.concat(
                            this.id
                          )
                        ),
                        null !== this.resendProvisionalTimer &&
                          (clearInterval(this.resendProvisionalTimer),
                          (this.resendProvisionalTimer = null)),
                        clearTimeout(this.L),
                        clearTimeout(this.H),
                        clearTimeout(this.I),
                        this.stateChanged(b.STATUS_TERMINATED),
                        this.ua.destroyTransaction(this))
                    }
                  },
                  {
                    key: 'resend_provisional',
                    value: function () {
                      this.transport.send(this.last_response) ||
                        this.onTransportError()
                    }
                  },
                  {
                    key: 'receiveResponse',
                    value: function (e, t, n, r) {
                      var s = this
                      if (e >= 100 && e <= 199)
                        switch (this.state) {
                          case b.STATUS_PROCEEDING:
                            this.transport.send(t) || this.onTransportError(),
                              (this.last_response = t)
                        }
                      if (
                        e > 100 &&
                        e <= 199 &&
                        this.state === b.STATUS_PROCEEDING
                      )
                        null === this.resendProvisionalTimer &&
                          (this.resendProvisionalTimer = setInterval(
                            function () {
                              s.resend_provisional()
                            },
                            m.PROVISIONAL_RESPONSE_INTERVAL
                          ))
                      else if (e >= 200 && e <= 299)
                        switch (this.state) {
                          case b.STATUS_PROCEEDING:
                            this.stateChanged(b.STATUS_ACCEPTED),
                              (this.last_response = t),
                              (this.L = setTimeout(function () {
                                s.timer_L()
                              }, m.TIMER_L)),
                              null !== this.resendProvisionalTimer &&
                                (clearInterval(this.resendProvisionalTimer),
                                (this.resendProvisionalTimer = null))
                          case b.STATUS_ACCEPTED:
                            this.transport.send(t)
                              ? n && n()
                              : (this.onTransportError(), r && r())
                        }
                      else if (e >= 300 && e <= 699)
                        switch (this.state) {
                          case b.STATUS_PROCEEDING:
                            null !== this.resendProvisionalTimer &&
                              (clearInterval(this.resendProvisionalTimer),
                              (this.resendProvisionalTimer = null)),
                              this.transport.send(t)
                                ? (this.stateChanged(b.STATUS_COMPLETED),
                                  (this.H = setTimeout(function () {
                                    s.timer_H()
                                  }, m.TIMER_H)),
                                  n && n())
                                : (this.onTransportError(), r && r())
                        }
                    }
                  },
                  {
                    key: 'C',
                    get: function () {
                      return b
                    }
                  }
                ]),
                n
              )
            })()
          t.exports = {
            C: b,
            NonInviteClientTransaction: S,
            InviteClientTransaction: E,
            AckClientTransaction: A,
            NonInviteServerTransaction: R,
            InviteServerTransaction: w,
            checkTransaction: function (e, t) {
              var n,
                r = e._transactions
              switch (t.method) {
                case _.INVITE:
                  if ((n = r.ist[t.via_branch])) {
                    switch (n.state) {
                      case b.STATUS_PROCEEDING:
                        n.transport.send(n.last_response)
                        break
                      case b.STATUS_ACCEPTED:
                    }
                    return !0
                  }
                  break
                case _.ACK:
                  if (!(n = r.ist[t.via_branch])) return !1
                  if (n.state === b.STATUS_ACCEPTED) return !1
                  if (n.state === b.STATUS_COMPLETED)
                    return (
                      (n.state = b.STATUS_CONFIRMED),
                      (n.I = setTimeout(function () {
                        n.timer_I()
                      }, m.TIMER_I)),
                      !0
                    )
                  break
                case _.CANCEL:
                  return (n = r.ist[t.via_branch])
                    ? (t.reply_sl(200), n.state !== b.STATUS_PROCEEDING)
                    : (t.reply_sl(481), !0)
                default:
                  if ((n = r.nist[t.via_branch])) {
                    switch (n.state) {
                      case b.STATUS_TRYING:
                        break
                      case b.STATUS_PROCEEDING:
                      case b.STATUS_COMPLETED:
                        n.transport.send(n.last_response)
                    }
                    return !0
                  }
              }
            }
          }
        },
        {
          './Constants': 2,
          './Logger': 9,
          './SIPMessage': 21,
          './Timers': 23,
          events: 31
        }
      ],
      25: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('./Logger'),
            i = e('./Socket'),
            o = e('./Constants'),
            l = new s('Transport'),
            u = {
              STATUS_CONNECTED: 0,
              STATUS_CONNECTING: 1,
              STATUS_DISCONNECTED: 2,
              SOCKET_STATUS_READY: 0,
              SOCKET_STATUS_ERROR: 1,
              recovery_options: {
                min_interval: o.CONNECTION_RECOVERY_MIN_INTERVAL,
                max_interval: o.CONNECTION_RECOVERY_MAX_INTERVAL
              }
            }
          t.exports = (function () {
            function e (t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : u.recovery_options
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                l.debug('new()'),
                (this.status = u.STATUS_DISCONNECTED),
                (this.socket = null),
                (this.sockets = []),
                (this.recovery_options = n),
                (this.recover_attempts = 0),
                (this.recovery_timer = null),
                (this.close_requested = !1)
              try {
                this.textDecoder = new TextDecoder('utf8')
              } catch (e) {
                l.warn('cannot use TextDecoder: '.concat(e))
              }
              if (void 0 === t)
                throw new TypeError(
                  "Invalid argument. undefined 'sockets' argument"
                )
              t instanceof Array || (t = [t]),
                t.forEach(function (e) {
                  if (!i.isSocket(e.socket))
                    throw new TypeError(
                      "Invalid argument. invalid 'JsSIP.Socket' instance"
                    )
                  if (e.weight && !Number(e.weight))
                    throw new TypeError(
                      "Invalid argument. 'weight' attribute is not a number"
                    )
                  this.sockets.push({
                    socket: e.socket,
                    weight: e.weight || 0,
                    status: u.SOCKET_STATUS_READY
                  })
                }, this),
                this._getSocket()
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'connect',
                  value: function () {
                    l.debug('connect()'),
                      this.isConnected()
                        ? l.debug('Transport is already connected')
                        : this.isConnecting()
                        ? l.debug('Transport is connecting')
                        : ((this.close_requested = !1),
                          (this.status = u.STATUS_CONNECTING),
                          this.onconnecting({
                            socket: this.socket,
                            attempts: this.recover_attempts
                          }),
                          this.close_requested ||
                            ((this.socket.onconnect = this._onConnect.bind(
                              this
                            )),
                            (this.socket.ondisconnect = this._onDisconnect.bind(
                              this
                            )),
                            (this.socket.ondata = this._onData.bind(this)),
                            this.socket.connect()))
                  }
                },
                {
                  key: 'disconnect',
                  value: function () {
                    l.debug('close()'),
                      (this.close_requested = !0),
                      (this.recover_attempts = 0),
                      (this.status = u.STATUS_DISCONNECTED),
                      null !== this.recovery_timer &&
                        (clearTimeout(this.recovery_timer),
                        (this.recovery_timer = null)),
                      (this.socket.onconnect = function () {}),
                      (this.socket.ondisconnect = function () {}),
                      (this.socket.ondata = function () {}),
                      this.socket.disconnect(),
                      this.ondisconnect({ socket: this.socket, error: !1 })
                  }
                },
                {
                  key: 'send',
                  value: function (e) {
                    if ((l.debug('send()'), !this.isConnected()))
                      return (
                        l.warn(
                          'unable to send message, transport is not connected'
                        ),
                        !1
                      )
                    var t = e.toString()
                    return (
                      l.debug('sending message:\n\n'.concat(t, '\n')),
                      this.socket.send(t)
                    )
                  }
                },
                {
                  key: 'isConnected',
                  value: function () {
                    return this.status === u.STATUS_CONNECTED
                  }
                },
                {
                  key: 'isConnecting',
                  value: function () {
                    return this.status === u.STATUS_CONNECTING
                  }
                },
                {
                  key: '_reconnect',
                  value: function () {
                    var e = this
                    this.recover_attempts += 1
                    var t = Math.floor(
                      Math.random() * Math.pow(2, this.recover_attempts) + 1
                    )
                    t < this.recovery_options.min_interval
                      ? (t = this.recovery_options.min_interval)
                      : t > this.recovery_options.max_interval &&
                        (t = this.recovery_options.max_interval),
                      l.debug(
                        'reconnection attempt: '
                          .concat(
                            this.recover_attempts,
                            '. next connection attempt in '
                          )
                          .concat(t, ' seconds')
                      ),
                      (this.recovery_timer = setTimeout(function () {
                        e.close_requested ||
                          e.isConnected() ||
                          e.isConnecting() ||
                          (e._getSocket(), e.connect())
                      }, 1e3 * t))
                  }
                },
                {
                  key: '_getSocket',
                  value: function () {
                    var e = []
                    if (
                      (this.sockets.forEach(function (t) {
                        t.status !== u.SOCKET_STATUS_ERROR &&
                          (0 === e.length
                            ? e.push(t)
                            : t.weight > e[0].weight
                            ? (e = [t])
                            : t.weight === e[0].weight && e.push(t))
                      }),
                      0 === e.length)
                    )
                      return (
                        this.sockets.forEach(function (e) {
                          e.status = u.SOCKET_STATUS_READY
                        }),
                        void this._getSocket()
                      )
                    var t = Math.floor(Math.random() * e.length)
                    this.socket = e[t].socket
                  }
                },
                {
                  key: '_onConnect',
                  value: function () {
                    ;(this.recover_attempts = 0),
                      (this.status = u.STATUS_CONNECTED),
                      null !== this.recovery_timer &&
                        (clearTimeout(this.recovery_timer),
                        (this.recovery_timer = null)),
                      this.onconnect({ socket: this })
                  }
                },
                {
                  key: '_onDisconnect',
                  value: function (e, t, n) {
                    ;(this.status = u.STATUS_DISCONNECTED),
                      this.ondisconnect({
                        socket: this.socket,
                        error: e,
                        code: t,
                        reason: n
                      }),
                      this.close_requested ||
                        (this.sockets.forEach(function (e) {
                          this.socket === e.socket &&
                            (e.status = u.SOCKET_STATUS_ERROR)
                        }, this),
                        this._reconnect(e))
                  }
                },
                {
                  key: '_onData',
                  value: function (e) {
                    if ('\r\n' !== e) {
                      if ('string' != typeof e) {
                        try {
                          e = this.textDecoder
                            ? this.textDecoder.decode(e)
                            : String.fromCharCode.apply(null, new Uint8Array(e))
                        } catch (e) {
                          return void l.debug(
                            'received binary message failed to be converted into string, message discarded'
                          )
                        }
                        l.debug('received binary message:\n\n'.concat(e, '\n'))
                      } else
                        l.debug('received text message:\n\n'.concat(e, '\n'))
                      this.ondata({ transport: this, message: e })
                    } else
                      l.debug('received message with CRLF Keep Alive response')
                  }
                },
                {
                  key: 'via_transport',
                  get: function () {
                    return this.socket.via_transport
                  }
                },
                {
                  key: 'url',
                  get: function () {
                    return this.socket.url
                  }
                },
                {
                  key: 'sip_uri',
                  get: function () {
                    return this.socket.sip_uri
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        { './Constants': 2, './Logger': 9, './Socket': 22 }
      ],
      26: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function i (e, t, n) {
            return t && s(e.prototype, t), n && s(e, n), e
          }
          function o (e, t) {
            return (o =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e
              })(e, t)
          }
          function l (e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1
              if (Reflect.construct.sham) return !1
              if ('function' == typeof Proxy) return !0
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                )
              } catch (e) {
                return !1
              }
            })()
            return function () {
              var n,
                s = a(e)
              if (t) {
                var i = a(this).constructor
                n = Reflect.construct(s, arguments, i)
              } else n = s.apply(this, arguments)
              return (function (e, t) {
                if (t && ('object' === r(t) || 'function' == typeof t)) return t
                return u(e)
              })(this, n)
            }
          }
          function u (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            return e
          }
          function a (e) {
            return (a = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
          }
          var c = e('events').EventEmitter,
            h = e('./Logger'),
            d = e('./Constants'),
            f = e('./Registrator'),
            _ = e('./RTCSession'),
            p = e('./Message'),
            m = e('./Options'),
            v = e('./Transactions'),
            g = e('./Transport'),
            y = e('./Utils'),
            T = e('./Exceptions'),
            C = e('./URI'),
            b = e('./Parser'),
            S = e('./SIPMessage'),
            E = e('./sanityCheck'),
            A = e('./Config'),
            R = new h('UA'),
            w = {
              STATUS_INIT: 0,
              STATUS_READY: 1,
              STATUS_USER_CLOSED: 2,
              STATUS_NOT_READY: 3,
              CONFIGURATION_ERROR: 1,
              NETWORK_ERROR: 2
            }
          t.exports = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && o(e, t)
            })(n, c)
            var t = l(n)
            function n (e) {
              var r
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, n),
                R.debug('new() [configuration:%o]', e),
                ((r = t.call(this))._cache = { credentials: {} }),
                (r._configuration = Object.assign({}, A.settings)),
                (r._dynConfiguration = {}),
                (r._dialogs = {}),
                (r._applicants = {}),
                (r._sessions = {}),
                (r._transport = null),
                (r._contact = null),
                (r._status = w.STATUS_INIT),
                (r._error = null),
                (r._transactions = { nist: {}, nict: {}, ist: {}, ict: {} }),
                (r._data = {}),
                (r._closeTimer = null),
                void 0 === e)
              )
                throw new TypeError('Not enough arguments')
              try {
                r._loadConfig(e)
              } catch (e) {
                throw ((r._status = w.STATUS_NOT_READY),
                (r._error = w.CONFIGURATION_ERROR),
                e)
              }
              return (r._registrator = new f(u(r))), r
            }
            return (
              i(n, null, [
                {
                  key: 'C',
                  get: function () {
                    return w
                  }
                }
              ]),
              i(n, [
                {
                  key: 'start',
                  value: function () {
                    R.debug('start()'),
                      this._status === w.STATUS_INIT
                        ? this._transport.connect()
                        : this._status === w.STATUS_USER_CLOSED
                        ? (R.debug('restarting UA'),
                          null !== this._closeTimer &&
                            (clearTimeout(this._closeTimer),
                            (this._closeTimer = null),
                            this._transport.disconnect()),
                          (this._status = w.STATUS_INIT),
                          this._transport.connect())
                        : this._status === w.STATUS_READY
                        ? R.debug('UA is in READY status, not restarted')
                        : R.debug(
                            'ERROR: connection is down, Auto-Recovery system is trying to reconnect'
                          ),
                      (this._dynConfiguration.register = this._configuration.register)
                  }
                },
                {
                  key: 'register',
                  value: function () {
                    R.debug('register()'),
                      (this._dynConfiguration.register = !0),
                      this._registrator.register()
                  }
                },
                {
                  key: 'unregister',
                  value: function (e) {
                    R.debug('unregister()'),
                      (this._dynConfiguration.register = !1),
                      this._registrator.unregister(e)
                  }
                },
                {
                  key: 'registrator',
                  value: function () {
                    return this._registrator
                  }
                },
                {
                  key: 'isRegistered',
                  value: function () {
                    return this._registrator.registered
                  }
                },
                {
                  key: 'isConnected',
                  value: function () {
                    return this._transport.isConnected()
                  }
                },
                {
                  key: 'call',
                  value: function (e, t) {
                    R.debug('call()')
                    var n = new _(this)
                    return n.connect(e, t), n
                  }
                },
                {
                  key: 'sendMessage',
                  value: function (e, t, n) {
                    R.debug('sendMessage()')
                    var r = new p(this)
                    return r.send(e, t, n), r
                  }
                },
                {
                  key: 'sendOptions',
                  value: function (e, t, n) {
                    R.debug('sendOptions()')
                    var r = new m(this)
                    return r.send(e, t, n), r
                  }
                },
                {
                  key: 'terminateSessions',
                  value: function (e) {
                    for (var t in (R.debug('terminateSessions()'),
                    this._sessions))
                      this._sessions[t].isEnded() ||
                        this._sessions[t].terminate(e)
                  }
                },
                {
                  key: 'stop',
                  value: function () {
                    var e = this
                    if (
                      (R.debug('stop()'),
                      (this._dynConfiguration = {}),
                      this._status !== w.STATUS_USER_CLOSED)
                    ) {
                      this._registrator.close()
                      var t = Object.keys(this._sessions).length
                      for (var n in this._sessions)
                        if (
                          Object.prototype.hasOwnProperty.call(
                            this._sessions,
                            n
                          )
                        ) {
                          R.debug('closing session '.concat(n))
                          try {
                            this._sessions[n].terminate()
                          } catch (e) {}
                        }
                      for (var r in this._applicants)
                        if (
                          Object.prototype.hasOwnProperty.call(
                            this._applicants,
                            r
                          )
                        )
                          try {
                            this._applicants[r].close()
                          } catch (e) {}
                      ;(this._status = w.STATUS_USER_CLOSED),
                        0 ===
                          Object.keys(this._transactions.nict).length +
                            Object.keys(this._transactions.nist).length +
                            Object.keys(this._transactions.ict).length +
                            Object.keys(this._transactions.ist).length &&
                        0 === t
                          ? this._transport.disconnect()
                          : (this._closeTimer = setTimeout(function () {
                              ;(e._closeTimer = null), e._transport.disconnect()
                            }, 2e3))
                    } else R.debug('UA already closed')
                  }
                },
                {
                  key: 'normalizeTarget',
                  value: function (e) {
                    return y.normalizeTarget(
                      e,
                      this._configuration.hostport_params
                    )
                  }
                },
                {
                  key: 'get',
                  value: function (e) {
                    switch (e) {
                      case 'authorization_user':
                        return this._configuration.authorization_user
                      case 'realm':
                        return this._configuration.realm
                      case 'ha1':
                        return this._configuration.ha1
                      case 'authorization_jwt':
                        return this._configuration.authorization_jwt
                      default:
                        return void R.warn(
                          'get() | cannot get "%s" parameter in runtime',
                          e
                        )
                    }
                  }
                },
                {
                  key: 'set',
                  value: function (e, t) {
                    switch (e) {
                      case 'authorization_user':
                        this._configuration.authorization_user = String(t)
                        break
                      case 'password':
                        this._configuration.password = String(t)
                        break
                      case 'realm':
                        this._configuration.realm = String(t)
                        break
                      case 'ha1':
                        ;(this._configuration.ha1 = String(t)),
                          (this._configuration.password = null)
                        break
                      case 'authorization_jwt':
                        this._configuration.authorization_jwt = String(t)
                        break
                      case 'display_name':
                        this._configuration.display_name = t
                        break
                      default:
                        return (
                          R.warn(
                            'set() | cannot set "%s" parameter in runtime',
                            e
                          ),
                          !1
                        )
                    }
                    return !0
                  }
                },
                {
                  key: 'newTransaction',
                  value: function (e) {
                    ;(this._transactions[e.type][e.id] = e),
                      this.emit('newTransaction', { transaction: e })
                  }
                },
                {
                  key: 'destroyTransaction',
                  value: function (e) {
                    delete this._transactions[e.type][e.id],
                      this.emit('transactionDestroyed', { transaction: e })
                  }
                },
                {
                  key: 'newDialog',
                  value: function (e) {
                    this._dialogs[e.id] = e
                  }
                },
                {
                  key: 'destroyDialog',
                  value: function (e) {
                    delete this._dialogs[e.id]
                  }
                },
                {
                  key: 'newMessage',
                  value: function (e, t) {
                    ;(this._applicants[e] = e), this.emit('newMessage', t)
                  }
                },
                {
                  key: 'newOptions',
                  value: function (e, t) {
                    ;(this._applicants[e] = e), this.emit('newOptions', t)
                  }
                },
                {
                  key: 'destroyMessage',
                  value: function (e) {
                    delete this._applicants[e]
                  }
                },
                {
                  key: 'newRTCSession',
                  value: function (e, t) {
                    ;(this._sessions[e.id] = e), this.emit('newRTCSession', t)
                  }
                },
                {
                  key: 'destroyRTCSession',
                  value: function (e) {
                    delete this._sessions[e.id]
                  }
                },
                {
                  key: 'registered',
                  value: function (e) {
                    this.emit('registered', e)
                  }
                },
                {
                  key: 'unregistered',
                  value: function (e) {
                    this.emit('unregistered', e)
                  }
                },
                {
                  key: 'registrationFailed',
                  value: function (e) {
                    this.emit('registrationFailed', e)
                  }
                },
                {
                  key: 'receiveRequest',
                  value: function (e) {
                    var t = e.method
                    if (
                      e.ruri.user !== this._configuration.uri.user &&
                      e.ruri.user !== this._contact.uri.user
                    )
                      return (
                        R.debug('Request-URI does not point to us'),
                        void (e.method !== d.ACK && e.reply_sl(404))
                      )
                    if (e.ruri.scheme !== d.SIPS) {
                      if (!v.checkTransaction(this, e)) {
                        if (
                          (t === d.INVITE
                            ? new v.InviteServerTransaction(
                                this,
                                this._transport,
                                e
                              )
                            : t !== d.ACK &&
                              t !== d.CANCEL &&
                              new v.NonInviteServerTransaction(
                                this,
                                this._transport,
                                e
                              ),
                          t === d.OPTIONS)
                        ) {
                          if (0 === this.listeners('newOptions').length)
                            return void e.reply(200)
                          new m(this).init_incoming(e)
                        } else if (t === d.MESSAGE) {
                          if (0 === this.listeners('newMessage').length)
                            return void e.reply(405)
                          new p(this).init_incoming(e)
                        } else if (
                          t === d.INVITE &&
                          !e.to_tag &&
                          0 === this.listeners('newRTCSession').length
                        )
                          return void e.reply(405)
                        var n, r
                        if (e.to_tag)
                          (n = this._findDialog(
                            e.call_id,
                            e.from_tag,
                            e.to_tag
                          ))
                            ? n.receiveRequest(e)
                            : t === d.NOTIFY
                            ? (r = this._findSession(e))
                              ? r.receiveRequest(e)
                              : (R.debug(
                                  'received NOTIFY request for a non existent subscription'
                                ),
                                e.reply(481, 'Subscription does not exist'))
                            : t !== d.ACK && e.reply(481)
                        else
                          switch (t) {
                            case d.INVITE:
                              if (window.RTCPeerConnection)
                                if (e.hasHeader('replaces')) {
                                  var s = e.replaces
                                  ;(n = this._findDialog(
                                    s.call_id,
                                    s.from_tag,
                                    s.to_tag
                                  ))
                                    ? (r = n.owner).isEnded()
                                      ? e.reply(603)
                                      : r.receiveRequest(e)
                                    : e.reply(481)
                                } else (r = new _(this)).init_incoming(e)
                              else
                                R.warn(
                                  'INVITE received but WebRTC is not supported'
                                ),
                                  e.reply(488)
                              break
                            case d.BYE:
                              e.reply(481)
                              break
                            case d.CANCEL:
                              ;(r = this._findSession(e))
                                ? r.receiveRequest(e)
                                : R.debug(
                                    'received CANCEL request for a non existent session'
                                  )
                              break
                            case d.ACK:
                              break
                            case d.NOTIFY:
                              this.emit('sipEvent', {
                                event: e.event,
                                request: e
                              }),
                                e.reply(200)
                              break
                            default:
                              e.reply(405)
                          }
                      }
                    } else e.reply_sl(416)
                  }
                },
                {
                  key: '_findSession',
                  value: function (e) {
                    var t = e.call_id,
                      n = e.from_tag,
                      r = e.to_tag,
                      s = t + n,
                      i = this._sessions[s],
                      o = t + r,
                      l = this._sessions[o]
                    return i || l || null
                  }
                },
                {
                  key: '_findDialog',
                  value: function (e, t, n) {
                    var r = e + t + n,
                      s = this._dialogs[r]
                    return (
                      s || ((r = e + n + t), (s = this._dialogs[r]) || null)
                    )
                  }
                },
                {
                  key: '_loadConfig',
                  value: function (e) {
                    try {
                      A.load(this._configuration, e)
                    } catch (e) {
                      throw e
                    }
                    0 === this._configuration.display_name &&
                      (this._configuration.display_name = '0'),
                      this._configuration.instance_id ||
                        (this._configuration.instance_id = y.newUUID()),
                      (this._configuration.jssip_id = y.createRandomToken(5))
                    var t = this._configuration.uri.clone()
                    ;(t.user = null),
                      (this._configuration.hostport_params = t
                        .toString()
                        .replace(/^sip:/i, ''))
                    try {
                      ;(this._transport = new g(this._configuration.sockets, {
                        max_interval: this._configuration
                          .connection_recovery_max_interval,
                        min_interval: this._configuration
                          .connection_recovery_min_interval
                      })),
                        (this._transport.onconnecting = function (e) {
                          this.emit('connecting', e)
                        }.bind(this)),
                        (this._transport.onconnect = function (e) {
                          if (this._status === w.STATUS_USER_CLOSED) return
                          ;(this._status = w.STATUS_READY),
                            (this._error = null),
                            this.emit('connected', e),
                            this._dynConfiguration.register &&
                              this._registrator.register()
                        }.bind(this)),
                        (this._transport.ondisconnect = function (e) {
                          for (
                            var t = 0, n = ['nict', 'ict', 'nist', 'ist'];
                            t < n.length;
                            t++
                          ) {
                            var r = n[t]
                            for (var s in this._transactions[r])
                              Object.prototype.hasOwnProperty.call(
                                this._transactions[r],
                                s
                              ) && this._transactions[r][s].onTransportError()
                          }
                          this.emit('disconnected', e),
                            this._registrator.onTransportClosed(),
                            this._status !== w.STATUS_USER_CLOSED &&
                              ((this._status = w.STATUS_NOT_READY),
                              (this._error = w.NETWORK_ERROR))
                        }.bind(this)),
                        (this._transport.ondata = function (e) {
                          var t = e.transport,
                            n = e.message
                          if (!(n = b.parseMessage(n, this))) return
                          if (
                            this._status === w.STATUS_USER_CLOSED &&
                            n instanceof S.IncomingRequest
                          )
                            return
                          if (!E(n, this, t)) return
                          if (n instanceof S.IncomingRequest)
                            (n.transport = t), this.receiveRequest(n)
                          else if (n instanceof S.IncomingResponse) {
                            var r
                            switch (n.method) {
                              case d.INVITE:
                                ;(r = this._transactions.ict[n.via_branch]) &&
                                  r.receiveResponse(n)
                                break
                              case d.ACK:
                                break
                              default:
                                ;(r = this._transactions.nict[n.via_branch]) &&
                                  r.receiveResponse(n)
                            }
                          }
                        }.bind(this))
                    } catch (e) {
                      throw (R.warn(e),
                      new T.ConfigurationError(
                        'sockets',
                        this._configuration.sockets
                      ))
                    }
                    if (
                      (delete this._configuration.sockets,
                      this._configuration.authorization_user ||
                        (this._configuration.authorization_user = this._configuration.uri.user),
                      !this._configuration.registrar_server)
                    ) {
                      var n = this._configuration.uri.clone()
                      ;(n.user = null),
                        n.clearParams(),
                        n.clearHeaders(),
                        (this._configuration.registrar_server = n)
                    }
                    ;(this._configuration.no_answer_timeout *= 1e3),
                      this._configuration.contact_uri
                        ? (this._configuration.via_host = this._configuration.contact_uri.host)
                        : (this._configuration.contact_uri = new C(
                            'sip',
                            y.createRandomToken(8),
                            this._configuration.via_host,
                            null,
                            { transport: 'ws' }
                          )),
                      (this._contact = {
                        pub_gruu: null,
                        temp_gruu: null,
                        uri: this._configuration.contact_uri,
                        toString: function () {
                          var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {},
                            t = e.anonymous || null,
                            n = e.outbound || null,
                            r = '<'
                          return (
                            (r += t
                              ? this.temp_gruu ||
                                'sip:anonymous@anonymous.invalid;transport=ws'
                              : this.pub_gruu || this.uri.toString()),
                            !n ||
                              (t ? this.temp_gruu : this.pub_gruu) ||
                              (r += ';ob'),
                            (r += '>')
                          )
                        }
                      })
                    var r = [
                      'authorization_user',
                      'password',
                      'realm',
                      'ha1',
                      'authorization_jwt',
                      'display_name',
                      'register'
                    ]
                    for (var s in this._configuration)
                      Object.prototype.hasOwnProperty.call(
                        this._configuration,
                        s
                      ) &&
                        (-1 !== r.indexOf(s)
                          ? Object.defineProperty(this._configuration, s, {
                              writable: !0,
                              configurable: !1
                            })
                          : Object.defineProperty(this._configuration, s, {
                              writable: !1,
                              configurable: !1
                            }))
                    for (var i in (R.debug(
                      'configuration parameters after validation:'
                    ),
                    this._configuration))
                      if (Object.prototype.hasOwnProperty.call(A.settings, i))
                        switch (i) {
                          case 'uri':
                          case 'registrar_server':
                            R.debug(
                              '- '
                                .concat(i, ': ')
                                .concat(this._configuration[i])
                            )
                            break
                          case 'password':
                          case 'ha1':
                          case 'authorization_jwt':
                            R.debug('- '.concat(i, ': NOT SHOWN'))
                            break
                          default:
                            R.debug(
                              '- '
                                .concat(i, ': ')
                                .concat(JSON.stringify(this._configuration[i]))
                            )
                        }
                  }
                },
                {
                  key: 'C',
                  get: function () {
                    return w
                  }
                },
                {
                  key: 'status',
                  get: function () {
                    return this._status
                  }
                },
                {
                  key: 'contact',
                  get: function () {
                    return this._contact
                  }
                },
                {
                  key: 'configuration',
                  get: function () {
                    return this._configuration
                  }
                },
                {
                  key: 'transport',
                  get: function () {
                    return this._transport
                  }
                }
              ]),
              n
            )
          })()
        },
        {
          './Config': 1,
          './Constants': 2,
          './Exceptions': 6,
          './Logger': 9,
          './Message': 10,
          './Options': 12,
          './Parser': 13,
          './RTCSession': 14,
          './Registrator': 19,
          './SIPMessage': 21,
          './Transactions': 24,
          './Transport': 25,
          './URI': 27,
          './Utils': 28,
          './sanityCheck': 30,
          events: 31
        }
      ],
      27: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return s(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return s(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  i = function () {}
                return {
                  s: i,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: i
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function s (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          function i (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          function o (e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e
          }
          var l = e('./Constants'),
            u = e('./Utils'),
            a = e('./Grammar')
          t.exports = (function () {
            function e (t, n, r, s) {
              var i =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : {},
                o =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : {}
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e),
                !r)
              )
                throw new TypeError('missing or invalid "host" parameter')
              for (var u in ((this._parameters = {}),
              (this._headers = {}),
              (this._scheme = t || l.SIP),
              (this._user = n),
              (this._host = r),
              (this._port = s),
              i))
                Object.prototype.hasOwnProperty.call(i, u) &&
                  this.setParam(u, i[u])
              for (var a in o)
                Object.prototype.hasOwnProperty.call(o, a) &&
                  this.setHeader(a, o[a])
            }
            return (
              o(e, null, [
                {
                  key: 'parse',
                  value: function (e) {
                    return -1 !== (e = a.parse(e, 'SIP_URI')) ? e : void 0
                  }
                }
              ]),
              o(e, [
                {
                  key: 'setParam',
                  value: function (e, t) {
                    e &&
                      (this._parameters[e.toLowerCase()] =
                        null == t ? null : t.toString())
                  }
                },
                {
                  key: 'getParam',
                  value: function (e) {
                    if (e) return this._parameters[e.toLowerCase()]
                  }
                },
                {
                  key: 'hasParam',
                  value: function (e) {
                    if (e)
                      return !!this._parameters.hasOwnProperty(e.toLowerCase())
                  }
                },
                {
                  key: 'deleteParam',
                  value: function (e) {
                    if (
                      ((e = e.toLowerCase()),
                      this._parameters.hasOwnProperty(e))
                    ) {
                      var t = this._parameters[e]
                      return delete this._parameters[e], t
                    }
                  }
                },
                {
                  key: 'clearParams',
                  value: function () {
                    this._parameters = {}
                  }
                },
                {
                  key: 'setHeader',
                  value: function (e, t) {
                    this._headers[u.headerize(e)] = Array.isArray(t) ? t : [t]
                  }
                },
                {
                  key: 'getHeader',
                  value: function (e) {
                    if (e) return this._headers[u.headerize(e)]
                  }
                },
                {
                  key: 'hasHeader',
                  value: function (e) {
                    if (e) return !!this._headers.hasOwnProperty(u.headerize(e))
                  }
                },
                {
                  key: 'deleteHeader',
                  value: function (e) {
                    if (
                      ((e = u.headerize(e)), this._headers.hasOwnProperty(e))
                    ) {
                      var t = this._headers[e]
                      return delete this._headers[e], t
                    }
                  }
                },
                {
                  key: 'clearHeaders',
                  value: function () {
                    this._headers = {}
                  }
                },
                {
                  key: 'clone',
                  value: function () {
                    return new e(
                      this._scheme,
                      this._user,
                      this._host,
                      this._port,
                      JSON.parse(JSON.stringify(this._parameters)),
                      JSON.parse(JSON.stringify(this._headers))
                    )
                  }
                },
                {
                  key: 'toString',
                  value: function () {
                    var e = [],
                      t = ''.concat(this._scheme, ':')
                    for (var n in (this._user &&
                      (t += ''.concat(u.escapeUser(this._user), '@')),
                    (t += this._host),
                    (this._port || 0 === this._port) &&
                      (t += ':'.concat(this._port)),
                    this._parameters))
                      Object.prototype.hasOwnProperty.call(
                        this._parameters,
                        n
                      ) &&
                        ((t += ';'.concat(n)),
                        null !== this._parameters[n] &&
                          (t += '='.concat(this._parameters[n])))
                    for (var s in this._headers)
                      if (
                        Object.prototype.hasOwnProperty.call(this._headers, s)
                      ) {
                        var i,
                          o = r(this._headers[s])
                        try {
                          for (o.s(); !(i = o.n()).done; ) {
                            var l = i.value
                            e.push(''.concat(s, '=').concat(l))
                          }
                        } catch (e) {
                          o.e(e)
                        } finally {
                          o.f()
                        }
                      }
                    return e.length > 0 && (t += '?'.concat(e.join('&'))), t
                  }
                },
                {
                  key: 'toAor',
                  value: function (e) {
                    var t = ''.concat(this._scheme, ':')
                    return (
                      this._user &&
                        (t += ''.concat(u.escapeUser(this._user), '@')),
                      (t += this._host),
                      e &&
                        (this._port || 0 === this._port) &&
                        (t += ':'.concat(this._port)),
                      t
                    )
                  }
                },
                {
                  key: 'scheme',
                  get: function () {
                    return this._scheme
                  },
                  set: function (e) {
                    this._scheme = e.toLowerCase()
                  }
                },
                {
                  key: 'user',
                  get: function () {
                    return this._user
                  },
                  set: function (e) {
                    this._user = e
                  }
                },
                {
                  key: 'host',
                  get: function () {
                    return this._host
                  },
                  set: function (e) {
                    this._host = e.toLowerCase()
                  }
                },
                {
                  key: 'port',
                  get: function () {
                    return this._port
                  },
                  set: function (e) {
                    this._port = 0 === e ? e : parseInt(e, 10) || null
                  }
                }
              ]),
              e
            )
          })()
        },
        { './Constants': 2, './Grammar': 7, './Utils': 28 }
      ],
      28: [
        function (e, t, n) {
          'use strict'
          function r (e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  })(e)
          }
          function s (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return i(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return i(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  s = function () {}
                return {
                  s: s,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: s
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function i (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          var o = e('./Constants'),
            l = e('./URI'),
            u = e('./Grammar')
          n.str_utf8_length = function (e) {
            return unescape(encodeURIComponent(e)).length
          }
          var a = (n.isFunction = function (e) {
            return (
              void 0 !== e &&
              '[object Function]' === Object.prototype.toString.call(e)
            )
          })
          ;(n.isString = function (e) {
            return (
              void 0 !== e &&
              '[object String]' === Object.prototype.toString.call(e)
            )
          }),
            (n.isDecimal = function (e) {
              return !isNaN(e) && parseFloat(e) === parseInt(e, 10)
            }),
            (n.isEmpty = function (e) {
              return (
                null === e ||
                '' === e ||
                void 0 === e ||
                (Array.isArray(e) && 0 === e.length) ||
                ('number' == typeof e && isNaN(e))
              )
            }),
            (n.hasMethods = function (e) {
              for (
                var t = arguments.length,
                  n = new Array(t > 1 ? t - 1 : 0),
                  r = 1;
                r < t;
                r++
              )
                n[r - 1] = arguments[r]
              for (var s = 0, i = n; s < i.length; s++) {
                var o = i[s]
                if (a(e[o])) return !1
              }
              return !0
            })
          var c = (n.createRandomToken = function (e) {
            var t,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 32,
              r = ''
            for (t = 0; t < e; t++) r += ((Math.random() * n) | 0).toString(n)
            return r
          })
          ;(n.newTag = function () {
            return c(10)
          }),
            (n.newUUID = function () {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                function (e) {
                  var t = (16 * Math.random()) | 0
                  return ('x' === e ? t : (3 & t) | 8).toString(16)
                }
              )
            }),
            (n.hostType = function (e) {
              if (e)
                return -1 !== (e = u.parse(e, 'host')) ? e.host_type : void 0
            })
          var h = (n.escapeUser = function (e) {
            return encodeURIComponent(decodeURIComponent(e))
              .replace(/%3A/gi, ':')
              .replace(/%2B/gi, '+')
              .replace(/%3F/gi, '?')
              .replace(/%2F/gi, '/')
          })
          ;(n.normalizeTarget = function (e, t) {
            if (e) {
              if (e instanceof l) return e
              if ('string' == typeof e) {
                var n,
                  r,
                  s,
                  i = e.split('@')
                switch (i.length) {
                  case 1:
                    if (!t) return
                    ;(n = e), (r = t)
                    break
                  case 2:
                    ;(n = i[0]), (r = i[1])
                    break
                  default:
                    ;(n = i.slice(0, i.length - 1).join('@')),
                      (r = i[i.length - 1])
                }
                return (
                  (n = n.replace(/^(sips?|tel):/i, '')),
                  /^[-.()]*\+?[0-9\-.()]+$/.test(n) &&
                    (n = n.replace(/[-.()]/g, '')),
                  (e = ''
                    .concat(o.SIP, ':')
                    .concat(h(n), '@')
                    .concat(r)),
                  (s = l.parse(e)) ? s : void 0
                )
              }
            } else;
          }),
            (n.headerize = function (e) {
              var t,
                n = {
                  'Call-Id': 'Call-ID',
                  Cseq: 'CSeq',
                  'Www-Authenticate': 'WWW-Authenticate'
                },
                r = e
                  .toLowerCase()
                  .replace(/_/g, '-')
                  .split('-'),
                s = '',
                i = r.length
              for (t = 0; t < i; t++)
                0 !== t && (s += '-'),
                  (s += r[t].charAt(0).toUpperCase() + r[t].substring(1))
              return n[s] && (s = n[s]), s
            }),
            (n.sipErrorCause = function (e) {
              for (var t in o.SIP_ERROR_CAUSES)
                if (-1 !== o.SIP_ERROR_CAUSES[t].indexOf(e)) return o.causes[t]
              return o.causes.SIP_FAILURE_CODE
            }),
            (n.getRandomTestNetIP = function () {
              return '192.0.2.'.concat(
                ((e = 1),
                (t = 254),
                Math.floor(Math.random() * (t - e + 1) + e))
              )
              var e, t
            }),
            (n.calculateMD5 = function (e) {
              function t (e, t) {
                return (e << t) | (e >>> (32 - t))
              }
              function n (e, t) {
                var n = 2147483648 & e,
                  r = 2147483648 & t,
                  s = 1073741824 & e,
                  i = 1073741824 & t,
                  o = (1073741823 & e) + (1073741823 & t)
                return s & i
                  ? 2147483648 ^ o ^ n ^ r
                  : s | i
                  ? 1073741824 & o
                    ? 3221225472 ^ o ^ n ^ r
                    : 1073741824 ^ o ^ n ^ r
                  : o ^ n ^ r
              }
              function r (e, r, s, i, o, l, u) {
                return (
                  (e = n(
                    e,
                    n(
                      n(
                        (function (e, t, n) {
                          return (e & t) | (~e & n)
                        })(r, s, i),
                        o
                      ),
                      u
                    )
                  )),
                  n(t(e, l), r)
                )
              }
              function s (e, r, s, i, o, l, u) {
                return (
                  (e = n(
                    e,
                    n(
                      n(
                        (function (e, t, n) {
                          return (e & n) | (t & ~n)
                        })(r, s, i),
                        o
                      ),
                      u
                    )
                  )),
                  n(t(e, l), r)
                )
              }
              function i (e, r, s, i, o, l, u) {
                return (
                  (e = n(
                    e,
                    n(
                      n(
                        (function (e, t, n) {
                          return e ^ t ^ n
                        })(r, s, i),
                        o
                      ),
                      u
                    )
                  )),
                  n(t(e, l), r)
                )
              }
              function o (e, r, s, i, o, l, u) {
                return (
                  (e = n(
                    e,
                    n(
                      n(
                        (function (e, t, n) {
                          return t ^ (e | ~n)
                        })(r, s, i),
                        o
                      ),
                      u
                    )
                  )),
                  n(t(e, l), r)
                )
              }
              function l (e) {
                var t,
                  n = '',
                  r = ''
                for (t = 0; t <= 3; t++)
                  n += (r = '0'.concat(
                    ((e >>> (8 * t)) & 255).toString(16)
                  )).substr(r.length - 2, 2)
                return n
              }
              var u, a, c, h, d, f, _, p, m, v
              for (
                u = (function (e) {
                  for (
                    var t,
                      n = e.length,
                      r = n + 8,
                      s = 16 * ((r - (r % 64)) / 64 + 1),
                      i = new Array(s - 1),
                      o = 0,
                      l = 0;
                    l < n;

                  )
                    (o = (l % 4) * 8),
                      (i[(t = (l - (l % 4)) / 4)] =
                        i[t] | (e.charCodeAt(l) << o)),
                      l++
                  return (
                    (o = (l % 4) * 8),
                    (i[(t = (l - (l % 4)) / 4)] = i[t] | (128 << o)),
                    (i[s - 2] = n << 3),
                    (i[s - 1] = n >>> 29),
                    i
                  )
                })(
                  (e = (function (e) {
                    e = e.replace(/\r\n/g, '\n')
                    for (var t = '', n = 0; n < e.length; n++) {
                      var r = e.charCodeAt(n)
                      r < 128
                        ? (t += String.fromCharCode(r))
                        : r > 127 && r < 2048
                        ? ((t += String.fromCharCode((r >> 6) | 192)),
                          (t += String.fromCharCode((63 & r) | 128)))
                        : ((t += String.fromCharCode((r >> 12) | 224)),
                          (t += String.fromCharCode(((r >> 6) & 63) | 128)),
                          (t += String.fromCharCode((63 & r) | 128)))
                    }
                    return t
                  })(e))
                ),
                  _ = 1732584193,
                  p = 4023233417,
                  m = 2562383102,
                  v = 271733878,
                  a = 0;
                a < u.length;
                a += 16
              )
                (c = _),
                  (h = p),
                  (d = m),
                  (f = v),
                  (_ = r(_, p, m, v, u[a + 0], 7, 3614090360)),
                  (v = r(v, _, p, m, u[a + 1], 12, 3905402710)),
                  (m = r(m, v, _, p, u[a + 2], 17, 606105819)),
                  (p = r(p, m, v, _, u[a + 3], 22, 3250441966)),
                  (_ = r(_, p, m, v, u[a + 4], 7, 4118548399)),
                  (v = r(v, _, p, m, u[a + 5], 12, 1200080426)),
                  (m = r(m, v, _, p, u[a + 6], 17, 2821735955)),
                  (p = r(p, m, v, _, u[a + 7], 22, 4249261313)),
                  (_ = r(_, p, m, v, u[a + 8], 7, 1770035416)),
                  (v = r(v, _, p, m, u[a + 9], 12, 2336552879)),
                  (m = r(m, v, _, p, u[a + 10], 17, 4294925233)),
                  (p = r(p, m, v, _, u[a + 11], 22, 2304563134)),
                  (_ = r(_, p, m, v, u[a + 12], 7, 1804603682)),
                  (v = r(v, _, p, m, u[a + 13], 12, 4254626195)),
                  (m = r(m, v, _, p, u[a + 14], 17, 2792965006)),
                  (_ = s(
                    _,
                    (p = r(p, m, v, _, u[a + 15], 22, 1236535329)),
                    m,
                    v,
                    u[a + 1],
                    5,
                    4129170786
                  )),
                  (v = s(v, _, p, m, u[a + 6], 9, 3225465664)),
                  (m = s(m, v, _, p, u[a + 11], 14, 643717713)),
                  (p = s(p, m, v, _, u[a + 0], 20, 3921069994)),
                  (_ = s(_, p, m, v, u[a + 5], 5, 3593408605)),
                  (v = s(v, _, p, m, u[a + 10], 9, 38016083)),
                  (m = s(m, v, _, p, u[a + 15], 14, 3634488961)),
                  (p = s(p, m, v, _, u[a + 4], 20, 3889429448)),
                  (_ = s(_, p, m, v, u[a + 9], 5, 568446438)),
                  (v = s(v, _, p, m, u[a + 14], 9, 3275163606)),
                  (m = s(m, v, _, p, u[a + 3], 14, 4107603335)),
                  (p = s(p, m, v, _, u[a + 8], 20, 1163531501)),
                  (_ = s(_, p, m, v, u[a + 13], 5, 2850285829)),
                  (v = s(v, _, p, m, u[a + 2], 9, 4243563512)),
                  (m = s(m, v, _, p, u[a + 7], 14, 1735328473)),
                  (_ = i(
                    _,
                    (p = s(p, m, v, _, u[a + 12], 20, 2368359562)),
                    m,
                    v,
                    u[a + 5],
                    4,
                    4294588738
                  )),
                  (v = i(v, _, p, m, u[a + 8], 11, 2272392833)),
                  (m = i(m, v, _, p, u[a + 11], 16, 1839030562)),
                  (p = i(p, m, v, _, u[a + 14], 23, 4259657740)),
                  (_ = i(_, p, m, v, u[a + 1], 4, 2763975236)),
                  (v = i(v, _, p, m, u[a + 4], 11, 1272893353)),
                  (m = i(m, v, _, p, u[a + 7], 16, 4139469664)),
                  (p = i(p, m, v, _, u[a + 10], 23, 3200236656)),
                  (_ = i(_, p, m, v, u[a + 13], 4, 681279174)),
                  (v = i(v, _, p, m, u[a + 0], 11, 3936430074)),
                  (m = i(m, v, _, p, u[a + 3], 16, 3572445317)),
                  (p = i(p, m, v, _, u[a + 6], 23, 76029189)),
                  (_ = i(_, p, m, v, u[a + 9], 4, 3654602809)),
                  (v = i(v, _, p, m, u[a + 12], 11, 3873151461)),
                  (m = i(m, v, _, p, u[a + 15], 16, 530742520)),
                  (_ = o(
                    _,
                    (p = i(p, m, v, _, u[a + 2], 23, 3299628645)),
                    m,
                    v,
                    u[a + 0],
                    6,
                    4096336452
                  )),
                  (v = o(v, _, p, m, u[a + 7], 10, 1126891415)),
                  (m = o(m, v, _, p, u[a + 14], 15, 2878612391)),
                  (p = o(p, m, v, _, u[a + 5], 21, 4237533241)),
                  (_ = o(_, p, m, v, u[a + 12], 6, 1700485571)),
                  (v = o(v, _, p, m, u[a + 3], 10, 2399980690)),
                  (m = o(m, v, _, p, u[a + 10], 15, 4293915773)),
                  (p = o(p, m, v, _, u[a + 1], 21, 2240044497)),
                  (_ = o(_, p, m, v, u[a + 8], 6, 1873313359)),
                  (v = o(v, _, p, m, u[a + 15], 10, 4264355552)),
                  (m = o(m, v, _, p, u[a + 6], 15, 2734768916)),
                  (p = o(p, m, v, _, u[a + 13], 21, 1309151649)),
                  (_ = o(_, p, m, v, u[a + 4], 6, 4149444226)),
                  (v = o(v, _, p, m, u[a + 11], 10, 3174756917)),
                  (m = o(m, v, _, p, u[a + 2], 15, 718787259)),
                  (p = o(p, m, v, _, u[a + 9], 21, 3951481745)),
                  (_ = n(_, c)),
                  (p = n(p, h)),
                  (m = n(m, d)),
                  (v = n(v, f))
              return (l(_) + l(p) + l(m) + l(v)).toLowerCase()
            }),
            (n.closeMediaStream = function (e) {
              if (e)
                try {
                  if (e.getTracks) {
                    var t,
                      n = s(e.getTracks())
                    try {
                      for (n.s(); !(t = n.n()).done; ) {
                        t.value.stop()
                      }
                    } catch (e) {
                      n.e(e)
                    } finally {
                      n.f()
                    }
                  } else {
                    var i,
                      o = s(e.getAudioTracks())
                    try {
                      for (o.s(); !(i = o.n()).done; ) {
                        i.value.stop()
                      }
                    } catch (e) {
                      o.e(e)
                    } finally {
                      o.f()
                    }
                    var l,
                      u = s(e.getVideoTracks())
                    try {
                      for (u.s(); !(l = u.n()).done; ) {
                        l.value.stop()
                      }
                    } catch (e) {
                      u.e(e)
                    } finally {
                      u.f()
                    }
                  }
                } catch (t) {
                  ;('function' != typeof e.stop && 'object' !== r(e.stop)) ||
                    e.stop()
                }
            }),
            (n.cloneArray = function (e) {
              return (e && e.slice()) || []
            }),
            (n.cloneObject = function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              return (e && Object.assign({}, e)) || t
            })
        },
        { './Constants': 2, './Grammar': 7, './URI': 27 }
      ],
      29: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          var s = e('./Logger'),
            i = e('./Grammar'),
            o = new s('WebSocketInterface')
          t.exports = (function () {
            function e (t) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                o.debug('new() [url:"%s"]', t),
                (this._url = t),
                (this._sip_uri = null),
                (this._via_transport = null),
                (this._ws = null)
              var n = i.parse(t, 'absoluteURI')
              if (-1 === n)
                throw (o.warn('invalid WebSocket URI: '.concat(t)),
                new TypeError('Invalid argument: '.concat(t)))
              if ('wss' !== n.scheme && 'ws' !== n.scheme)
                throw (o.warn(
                  'invalid WebSocket URI scheme: '.concat(n.scheme)
                ),
                new TypeError('Invalid argument: '.concat(t)))
              ;(this._sip_uri = 'sip:'
                .concat(n.host)
                .concat(n.port ? ':'.concat(n.port) : '', ';transport=ws')),
                (this._via_transport = n.scheme.toUpperCase())
            }
            var t, n, s
            return (
              (t = e),
              (n = [
                {
                  key: 'connect',
                  value: function () {
                    if ((o.debug('connect()'), this.isConnected()))
                      o.debug(
                        'WebSocket '.concat(this._url, ' is already connected')
                      )
                    else if (this.isConnecting())
                      o.debug('WebSocket '.concat(this._url, ' is connecting'))
                    else {
                      this._ws && this.disconnect(),
                        o.debug('connecting to WebSocket '.concat(this._url))
                      try {
                        ;(this._ws = new WebSocket(this._url, 'sip')),
                          (this._ws.binaryType = 'arraybuffer'),
                          (this._ws.onopen = this._onOpen.bind(this)),
                          (this._ws.onclose = this._onClose.bind(this)),
                          (this._ws.onmessage = this._onMessage.bind(this)),
                          (this._ws.onerror = this._onError.bind(this))
                      } catch (e) {
                        this._onError(e)
                      }
                    }
                  }
                },
                {
                  key: 'disconnect',
                  value: function () {
                    o.debug('disconnect()'),
                      this._ws &&
                        ((this._ws.onopen = function () {}),
                        (this._ws.onclose = function () {}),
                        (this._ws.onmessage = function () {}),
                        (this._ws.onerror = function () {}),
                        this._ws.close(),
                        (this._ws = null))
                  }
                },
                {
                  key: 'send',
                  value: function (e) {
                    return (
                      o.debug('send()'),
                      this.isConnected()
                        ? (this._ws.send(e), !0)
                        : (o.warn(
                            'unable to send message, WebSocket is not open'
                          ),
                          !1)
                    )
                  }
                },
                {
                  key: 'isConnected',
                  value: function () {
                    return this._ws && this._ws.readyState === this._ws.OPEN
                  }
                },
                {
                  key: 'isConnecting',
                  value: function () {
                    return (
                      this._ws && this._ws.readyState === this._ws.CONNECTING
                    )
                  }
                },
                {
                  key: '_onOpen',
                  value: function () {
                    o.debug('WebSocket '.concat(this._url, ' connected')),
                      this.onconnect()
                  }
                },
                {
                  key: '_onClose',
                  value: function (e) {
                    var t = e.wasClean,
                      n = e.code,
                      r = e.reason
                    o.debug('WebSocket '.concat(this._url, ' closed')),
                      !1 === t && o.debug('WebSocket abrupt disconnection'),
                      this.ondisconnect(!t, n, r)
                  }
                },
                {
                  key: '_onMessage',
                  value: function (e) {
                    var t = e.data
                    o.debug('received WebSocket message'), this.ondata(t)
                  }
                },
                {
                  key: '_onError',
                  value: function (e) {
                    o.warn('WebSocket '.concat(this._url, ' error: '), e)
                  }
                },
                {
                  key: 'via_transport',
                  get: function () {
                    return this._via_transport
                  },
                  set: function (e) {
                    this._via_transport = e.toUpperCase()
                  }
                },
                {
                  key: 'sip_uri',
                  get: function () {
                    return this._sip_uri
                  }
                },
                {
                  key: 'url',
                  get: function () {
                    return this._url
                  }
                }
              ]) && r(t.prototype, n),
              s && r(t, s),
              e
            )
          })()
        },
        { './Grammar': 7, './Logger': 9 }
      ],
      30: [
        function (e, t, n) {
          'use strict'
          function r (e, t) {
            var n
            if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
              if (
                Array.isArray(e) ||
                (n = (function (e, t) {
                  if (!e) return
                  if ('string' == typeof e) return s(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  'Object' === n && e.constructor && (n = e.constructor.name)
                  if ('Map' === n || 'Set' === n) return Array.from(e)
                  if (
                    'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  )
                    return s(e, t)
                })(e)) ||
                (t && e && 'number' == typeof e.length)
              ) {
                n && (e = n)
                var r = 0,
                  i = function () {}
                return {
                  s: i,
                  n: function () {
                    return r >= e.length
                      ? { done: !0 }
                      : { done: !1, value: e[r++] }
                  },
                  e: function (e) {
                    throw e
                  },
                  f: i
                }
              }
              throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            }
            var o,
              l = !0,
              u = !1
            return {
              s: function () {
                n = e[Symbol.iterator]()
              },
              n: function () {
                var e = n.next()
                return (l = e.done), e
              },
              e: function (e) {
                ;(u = !0), (o = e)
              },
              f: function () {
                try {
                  l || null == n.return || n.return()
                } finally {
                  if (u) throw o
                }
              }
            }
          }
          function s (e, t) {
            ;(null == t || t > e.length) && (t = e.length)
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
            return r
          }
          var i,
            o,
            l,
            u = e('./Logger'),
            a = e('./Constants'),
            c = e('./SIPMessage'),
            h = e('./Utils'),
            d = new u('sanityCheck'),
            f = [
              function () {
                for (
                  var e = 0, t = ['from', 'to', 'call_id', 'cseq', 'via'];
                  e < t.length;
                  e++
                ) {
                  var n = t[e]
                  if (!i.hasHeader(n))
                    return (
                      d.debug(
                        'missing mandatory header field : '.concat(
                          n,
                          ', dropping the response'
                        )
                      ),
                      !1
                    )
                }
              }
            ],
            _ = [
              function () {
                if ('sip' !== i.s('to').uri.scheme) return m(416), !1
              },
              function () {
                if (
                  !i.to_tag &&
                  i.call_id.substr(0, 5) === o.configuration.jssip_id
                )
                  return m(482), !1
              },
              function () {
                var e = h.str_utf8_length(i.body),
                  t = i.getHeader('content-length')
                if (e < t) return m(400), !1
              },
              function () {
                var e,
                  t = i.from_tag,
                  n = i.call_id,
                  r = i.cseq
                if (i.to_tag) return
                if (i.method === a.INVITE) {
                  if (o._transactions.ist[i.via_branch]) return !1
                  for (var s in o._transactions.ist)
                    if (
                      Object.prototype.hasOwnProperty.call(
                        o._transactions.ist,
                        s
                      ) &&
                      (e = o._transactions.ist[s]).request.from_tag === t &&
                      e.request.call_id === n &&
                      e.request.cseq === r
                    )
                      return m(482), !1
                } else {
                  if (o._transactions.nist[i.via_branch]) return !1
                  for (var l in o._transactions.nist)
                    if (
                      Object.prototype.hasOwnProperty.call(
                        o._transactions.nist,
                        l
                      ) &&
                      (e = o._transactions.nist[l]).request.from_tag === t &&
                      e.request.call_id === n &&
                      e.request.cseq === r
                    )
                      return m(482), !1
                }
              }
            ],
            p = [
              function () {
                if (i.getHeaders('via').length > 3)
                  return (
                    d.debug(
                      'more than one Via header field present in the response, dropping the response'
                    ),
                    !1
                  )
              },
              function () {
                var e = h.str_utf8_length(i.body),
                  t = i.getHeader('content-length')
                if (e < t)
                  return (
                    d.debug(
                      'message body length is lower than the value in Content-Length header field, dropping the response'
                    ),
                    !1
                  )
              }
            ]
          function m (e) {
            var t,
              n,
              s = i.getHeaders('via'),
              o = 'SIP/2.0 '.concat(e, ' ').concat(a.REASON_PHRASE[e], '\r\n'),
              u = r(s)
            try {
              for (u.s(); !(n = u.n()).done; ) {
                var c = n.value
                o += 'Via: '.concat(c, '\r\n')
              }
            } catch (e) {
              u.e(e)
            } finally {
              u.f()
            }
            ;(t = i.getHeader('To')),
              i.to_tag || (t += ';tag='.concat(h.newTag())),
              (o += 'To: '.concat(t, '\r\n')),
              (o += 'From: '.concat(i.getHeader('From'), '\r\n')),
              (o += 'Call-ID: '.concat(i.call_id, '\r\n')),
              (o += 'CSeq: '.concat(i.cseq, ' ').concat(i.method, '\r\n')),
              (o += '\r\n'),
              l.send(o)
          }
          t.exports = function (e, t, n) {
            ;(i = e), (o = t), (l = n)
            var s,
              u = r(f)
            try {
              for (u.s(); !(s = u.n()).done; ) {
                if (!1 === (0, s.value)()) return !1
              }
            } catch (e) {
              u.e(e)
            } finally {
              u.f()
            }
            if (i instanceof c.IncomingRequest) {
              var a,
                h = r(_)
              try {
                for (h.s(); !(a = h.n()).done; ) {
                  if (!1 === (0, a.value)()) return !1
                }
              } catch (e) {
                h.e(e)
              } finally {
                h.f()
              }
            } else if (i instanceof c.IncomingResponse) {
              var d,
                m = r(p)
              try {
                for (m.s(); !(d = m.n()).done; ) {
                  if (!1 === (0, d.value)()) return !1
                }
              } catch (e) {
                m.e(e)
              } finally {
                m.f()
              }
            }
            return !0
          }
        },
        { './Constants': 2, './Logger': 9, './SIPMessage': 21, './Utils': 28 }
      ],
      31: [
        function (e, t, n) {
          var r =
              Object.create ||
              function (e) {
                var t = function () {}
                return (t.prototype = e), new t()
              },
            s =
              Object.keys ||
              function (e) {
                var t = []
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && t.push(n)
                return n
              },
            i =
              Function.prototype.bind ||
              function (e) {
                var t = this
                return function () {
                  return t.apply(e, arguments)
                }
              }
          function o () {
            ;(this._events &&
              Object.prototype.hasOwnProperty.call(this, '_events')) ||
              ((this._events = r(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0)
          }
          ;(t.exports = o),
            (o.EventEmitter = o),
            (o.prototype._events = void 0),
            (o.prototype._maxListeners = void 0)
          var l,
            u = 10
          try {
            var a = {}
            Object.defineProperty &&
              Object.defineProperty(a, 'x', { value: 0 }),
              (l = 0 === a.x)
          } catch (e) {
            l = !1
          }
          function c (e) {
            return void 0 === e._maxListeners
              ? o.defaultMaxListeners
              : e._maxListeners
          }
          function h (e, t, n, s) {
            var i, o, l
            if ('function' != typeof n)
              throw new TypeError('"listener" argument must be a function')
            if (
              ((o = e._events)
                ? (o.newListener &&
                    (e.emit('newListener', t, n.listener ? n.listener : n),
                    (o = e._events)),
                  (l = o[t]))
                : ((o = e._events = r(null)), (e._eventsCount = 0)),
              l)
            ) {
              if (
                ('function' == typeof l
                  ? (l = o[t] = s ? [n, l] : [l, n])
                  : s
                  ? l.unshift(n)
                  : l.push(n),
                !l.warned && (i = c(e)) && i > 0 && l.length > i)
              ) {
                l.warned = !0
                var u = new Error(
                  'Possible EventEmitter memory leak detected. ' +
                    l.length +
                    ' "' +
                    String(t) +
                    '" listeners added. Use emitter.setMaxListeners() to increase limit.'
                )
                ;(u.name = 'MaxListenersExceededWarning'),
                  (u.emitter = e),
                  (u.type = t),
                  (u.count = l.length),
                  'object' == typeof console &&
                    console.warn &&
                    console.warn('%s: %s', u.name, u.message)
              }
            } else (l = o[t] = n), ++e._eventsCount
            return e
          }
          function d () {
            if (!this.fired)
              switch (
                (this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                arguments.length)
              ) {
                case 0:
                  return this.listener.call(this.target)
                case 1:
                  return this.listener.call(this.target, arguments[0])
                case 2:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1]
                  )
                case 3:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1],
                    arguments[2]
                  )
                default:
                  for (
                    var e = new Array(arguments.length), t = 0;
                    t < e.length;
                    ++t
                  )
                    e[t] = arguments[t]
                  this.listener.apply(this.target, e)
              }
          }
          function f (e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
              },
              s = i.call(d, r)
            return (s.listener = n), (r.wrapFn = s), s
          }
          function _ (e, t, n) {
            var r = e._events
            if (!r) return []
            var s = r[t]
            return s
              ? 'function' == typeof s
                ? n
                  ? [s.listener || s]
                  : [s]
                : n
                ? (function (e) {
                    for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                      t[n] = e[n].listener || e[n]
                    return t
                  })(s)
                : m(s, s.length)
              : []
          }
          function p (e) {
            var t = this._events
            if (t) {
              var n = t[e]
              if ('function' == typeof n) return 1
              if (n) return n.length
            }
            return 0
          }
          function m (e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r]
            return n
          }
          l
            ? Object.defineProperty(o, 'defaultMaxListeners', {
                enumerable: !0,
                get: function () {
                  return u
                },
                set: function (e) {
                  if ('number' != typeof e || e < 0 || e != e)
                    throw new TypeError(
                      '"defaultMaxListeners" must be a positive number'
                    )
                  u = e
                }
              })
            : (o.defaultMaxListeners = u),
            (o.prototype.setMaxListeners = function (e) {
              if ('number' != typeof e || e < 0 || isNaN(e))
                throw new TypeError('"n" argument must be a positive number')
              return (this._maxListeners = e), this
            }),
            (o.prototype.getMaxListeners = function () {
              return c(this)
            }),
            (o.prototype.emit = function (e) {
              var t,
                n,
                r,
                s,
                i,
                o,
                l = 'error' === e
              if ((o = this._events)) l = l && null == o.error
              else if (!l) return !1
              if (l) {
                if (
                  (arguments.length > 1 && (t = arguments[1]),
                  t instanceof Error)
                )
                  throw t
                var u = new Error('Unhandled "error" event. (' + t + ')')
                throw ((u.context = t), u)
              }
              if (!(n = o[e])) return !1
              var a = 'function' == typeof n
              switch ((r = arguments.length)) {
                case 1:
                  !(function (e, t, n) {
                    if (t) e.call(n)
                    else
                      for (var r = e.length, s = m(e, r), i = 0; i < r; ++i)
                        s[i].call(n)
                  })(n, a, this)
                  break
                case 2:
                  !(function (e, t, n, r) {
                    if (t) e.call(n, r)
                    else
                      for (var s = e.length, i = m(e, s), o = 0; o < s; ++o)
                        i[o].call(n, r)
                  })(n, a, this, arguments[1])
                  break
                case 3:
                  !(function (e, t, n, r, s) {
                    if (t) e.call(n, r, s)
                    else
                      for (var i = e.length, o = m(e, i), l = 0; l < i; ++l)
                        o[l].call(n, r, s)
                  })(n, a, this, arguments[1], arguments[2])
                  break
                case 4:
                  !(function (e, t, n, r, s, i) {
                    if (t) e.call(n, r, s, i)
                    else
                      for (var o = e.length, l = m(e, o), u = 0; u < o; ++u)
                        l[u].call(n, r, s, i)
                  })(n, a, this, arguments[1], arguments[2], arguments[3])
                  break
                default:
                  for (s = new Array(r - 1), i = 1; i < r; i++)
                    s[i - 1] = arguments[i]
                  !(function (e, t, n, r) {
                    if (t) e.apply(n, r)
                    else
                      for (var s = e.length, i = m(e, s), o = 0; o < s; ++o)
                        i[o].apply(n, r)
                  })(n, a, this, s)
              }
              return !0
            }),
            (o.prototype.addListener = function (e, t) {
              return h(this, e, t, !1)
            }),
            (o.prototype.on = o.prototype.addListener),
            (o.prototype.prependListener = function (e, t) {
              return h(this, e, t, !0)
            }),
            (o.prototype.once = function (e, t) {
              if ('function' != typeof t)
                throw new TypeError('"listener" argument must be a function')
              return this.on(e, f(this, e, t)), this
            }),
            (o.prototype.prependOnceListener = function (e, t) {
              if ('function' != typeof t)
                throw new TypeError('"listener" argument must be a function')
              return this.prependListener(e, f(this, e, t)), this
            }),
            (o.prototype.removeListener = function (e, t) {
              var n, s, i, o, l
              if ('function' != typeof t)
                throw new TypeError('"listener" argument must be a function')
              if (!(s = this._events)) return this
              if (!(n = s[e])) return this
              if (n === t || n.listener === t)
                0 == --this._eventsCount
                  ? (this._events = r(null))
                  : (delete s[e],
                    s.removeListener &&
                      this.emit('removeListener', e, n.listener || t))
              else if ('function' != typeof n) {
                for (i = -1, o = n.length - 1; o >= 0; o--)
                  if (n[o] === t || n[o].listener === t) {
                    ;(l = n[o].listener), (i = o)
                    break
                  }
                if (i < 0) return this
                0 === i
                  ? n.shift()
                  : (function (e, t) {
                      for (
                        var n = t, r = n + 1, s = e.length;
                        r < s;
                        n += 1, r += 1
                      )
                        e[n] = e[r]
                      e.pop()
                    })(n, i),
                  1 === n.length && (s[e] = n[0]),
                  s.removeListener && this.emit('removeListener', e, l || t)
              }
              return this
            }),
            (o.prototype.removeAllListeners = function (e) {
              var t, n, i
              if (!(n = this._events)) return this
              if (!n.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = r(null)), (this._eventsCount = 0))
                    : n[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = r(null))
                        : delete n[e]),
                  this
                )
              if (0 === arguments.length) {
                var o,
                  l = s(n)
                for (i = 0; i < l.length; ++i)
                  'removeListener' !== (o = l[i]) && this.removeAllListeners(o)
                return (
                  this.removeAllListeners('removeListener'),
                  (this._events = r(null)),
                  (this._eventsCount = 0),
                  this
                )
              }
              if ('function' == typeof (t = n[e])) this.removeListener(e, t)
              else if (t)
                for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i])
              return this
            }),
            (o.prototype.listeners = function (e) {
              return _(this, e, !0)
            }),
            (o.prototype.rawListeners = function (e) {
              return _(this, e, !1)
            }),
            (o.listenerCount = function (e, t) {
              return 'function' == typeof e.listenerCount
                ? e.listenerCount(t)
                : p.call(e, t)
            }),
            (o.prototype.listenerCount = p),
            (o.prototype.eventNames = function () {
              return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
            })
        },
        {}
      ],
      32: [
        function (e, t, n) {
          ;(function (r) {
            ;(n.log = function (...e) {
              return (
                'object' == typeof console && console.log && console.log(...e)
              )
            }),
              (n.formatArgs = function (e) {
                if (
                  ((e[0] =
                    (this.useColors ? '%c' : '') +
                    this.namespace +
                    (this.useColors ? ' %c' : ' ') +
                    e[0] +
                    (this.useColors ? '%c ' : ' ') +
                    '+' +
                    t.exports.humanize(this.diff)),
                  !this.useColors)
                )
                  return
                const n = 'color: ' + this.color
                e.splice(1, 0, n, 'color: inherit')
                let r = 0,
                  s = 0
                e[0].replace(/%[a-zA-Z%]/g, e => {
                  '%%' !== e && (r++, '%c' === e && (s = r))
                }),
                  e.splice(s, 0, n)
              }),
              (n.save = function (e) {
                try {
                  e
                    ? n.storage.setItem('debug', e)
                    : n.storage.removeItem('debug')
                } catch (e) {}
              }),
              (n.load = function () {
                let e
                try {
                  e = n.storage.getItem('debug')
                } catch (e) {}
                !e && void 0 !== r && 'env' in r && (e = r.env.DEBUG)
                return e
              }),
              (n.useColors = function () {
                if (
                  'undefined' != typeof window &&
                  window.process &&
                  ('renderer' === window.process.type || window.process.__nwjs)
                )
                  return !0
                if (
                  'undefined' != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/(edge|trident)\/(\d+)/)
                )
                  return !1
                return (
                  ('undefined' != typeof document &&
                    document.documentElement &&
                    document.documentElement.style &&
                    document.documentElement.style.WebkitAppearance) ||
                  ('undefined' != typeof window &&
                    window.console &&
                    (window.console.firebug ||
                      (window.console.exception && window.console.table))) ||
                  ('undefined' != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                    parseInt(RegExp.$1, 10) >= 31) ||
                  ('undefined' != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent
                      .toLowerCase()
                      .match(/applewebkit\/(\d+)/))
                )
              }),
              (n.storage = (function () {
                try {
                  return localStorage
                } catch (e) {}
              })()),
              (n.colors = [
                '#0000CC',
                '#0000FF',
                '#0033CC',
                '#0033FF',
                '#0066CC',
                '#0066FF',
                '#0099CC',
                '#0099FF',
                '#00CC00',
                '#00CC33',
                '#00CC66',
                '#00CC99',
                '#00CCCC',
                '#00CCFF',
                '#3300CC',
                '#3300FF',
                '#3333CC',
                '#3333FF',
                '#3366CC',
                '#3366FF',
                '#3399CC',
                '#3399FF',
                '#33CC00',
                '#33CC33',
                '#33CC66',
                '#33CC99',
                '#33CCCC',
                '#33CCFF',
                '#6600CC',
                '#6600FF',
                '#6633CC',
                '#6633FF',
                '#66CC00',
                '#66CC33',
                '#9900CC',
                '#9900FF',
                '#9933CC',
                '#9933FF',
                '#99CC00',
                '#99CC33',
                '#CC0000',
                '#CC0033',
                '#CC0066',
                '#CC0099',
                '#CC00CC',
                '#CC00FF',
                '#CC3300',
                '#CC3333',
                '#CC3366',
                '#CC3399',
                '#CC33CC',
                '#CC33FF',
                '#CC6600',
                '#CC6633',
                '#CC9900',
                '#CC9933',
                '#CCCC00',
                '#CCCC33',
                '#FF0000',
                '#FF0033',
                '#FF0066',
                '#FF0099',
                '#FF00CC',
                '#FF00FF',
                '#FF3300',
                '#FF3333',
                '#FF3366',
                '#FF3399',
                '#FF33CC',
                '#FF33FF',
                '#FF6600',
                '#FF6633',
                '#FF9900',
                '#FF9933',
                '#FFCC00',
                '#FFCC33'
              ]),
              (t.exports = e('./common')(n))
            const { formatters: s } = t.exports
            s.j = function (e) {
              try {
                return JSON.stringify(e)
              } catch (e) {
                return '[UnexpectedJSONParseError]: ' + e.message
              }
            }
          }.call(this, e('_process')))
        },
        { './common': 33, _process: 35 }
      ],
      33: [
        function (e, t, n) {
          t.exports = function (t) {
            function n (e) {
              let t = 0
              for (let n = 0; n < e.length; n++)
                (t = (t << 5) - t + e.charCodeAt(n)), (t |= 0)
              return r.colors[Math.abs(t) % r.colors.length]
            }
            function r (e) {
              let t
              function o (...e) {
                if (!o.enabled) return
                const n = o,
                  s = Number(new Date()),
                  i = s - (t || s)
                ;(n.diff = i),
                  (n.prev = t),
                  (n.curr = s),
                  (t = s),
                  (e[0] = r.coerce(e[0])),
                  'string' != typeof e[0] && e.unshift('%O')
                let l = 0
                ;(e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, s) => {
                  if ('%%' === t) return t
                  l++
                  const i = r.formatters[s]
                  if ('function' == typeof i) {
                    const r = e[l]
                    ;(t = i.call(n, r)), e.splice(l, 1), l--
                  }
                  return t
                })),
                  r.formatArgs.call(n, e),
                  (n.log || r.log).apply(n, e)
              }
              return (
                (o.namespace = e),
                (o.enabled = r.enabled(e)),
                (o.useColors = r.useColors()),
                (o.color = n(e)),
                (o.destroy = s),
                (o.extend = i),
                'function' == typeof r.init && r.init(o),
                r.instances.push(o),
                o
              )
            }
            function s () {
              const e = r.instances.indexOf(this)
              return -1 !== e && (r.instances.splice(e, 1), !0)
            }
            function i (e, t) {
              const n = r(this.namespace + (void 0 === t ? ':' : t) + e)
              return (n.log = this.log), n
            }
            function o (e) {
              return e
                .toString()
                .substring(2, e.toString().length - 2)
                .replace(/\.\*\?$/, '*')
            }
            return (
              (r.debug = r),
              (r.default = r),
              (r.coerce = function (e) {
                return e instanceof Error ? e.stack || e.message : e
              }),
              (r.disable = function () {
                const e = [
                  ...r.names.map(o),
                  ...r.skips.map(o).map(e => '-' + e)
                ].join(',')
                return r.enable(''), e
              }),
              (r.enable = function (e) {
                let t
                r.save(e), (r.names = []), (r.skips = [])
                const n = ('string' == typeof e ? e : '').split(/[\s,]+/),
                  s = n.length
                for (t = 0; t < s; t++)
                  n[t] &&
                    ('-' === (e = n[t].replace(/\*/g, '.*?'))[0]
                      ? r.skips.push(new RegExp('^' + e.substr(1) + '$'))
                      : r.names.push(new RegExp('^' + e + '$')))
                for (t = 0; t < r.instances.length; t++) {
                  const e = r.instances[t]
                  e.enabled = r.enabled(e.namespace)
                }
              }),
              (r.enabled = function (e) {
                if ('*' === e[e.length - 1]) return !0
                let t, n
                for (t = 0, n = r.skips.length; t < n; t++)
                  if (r.skips[t].test(e)) return !1
                for (t = 0, n = r.names.length; t < n; t++)
                  if (r.names[t].test(e)) return !0
                return !1
              }),
              (r.humanize = e('ms')),
              Object.keys(t).forEach(e => {
                r[e] = t[e]
              }),
              (r.instances = []),
              (r.names = []),
              (r.skips = []),
              (r.formatters = {}),
              (r.selectColor = n),
              r.enable(r.load()),
              r
            )
          }
        },
        { ms: 34 }
      ],
      34: [
        function (e, t, n) {
          var r = 1e3,
            s = 60 * r,
            i = 60 * s,
            o = 24 * i,
            l = 7 * o,
            u = 365.25 * o
          function a (e, t, n, r) {
            var s = t >= 1.5 * n
            return Math.round(e / n) + ' ' + r + (s ? 's' : '')
          }
          t.exports = function (e, t) {
            t = t || {}
            var n = typeof e
            if ('string' === n && e.length > 0)
              return (function (e) {
                if ((e = String(e)).length > 100) return
                var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  e
                )
                if (!t) return
                var n = parseFloat(t[1])
                switch ((t[2] || 'ms').toLowerCase()) {
                  case 'years':
                  case 'year':
                  case 'yrs':
                  case 'yr':
                  case 'y':
                    return n * u
                  case 'weeks':
                  case 'week':
                  case 'w':
                    return n * l
                  case 'days':
                  case 'day':
                  case 'd':
                    return n * o
                  case 'hours':
                  case 'hour':
                  case 'hrs':
                  case 'hr':
                  case 'h':
                    return n * i
                  case 'minutes':
                  case 'minute':
                  case 'mins':
                  case 'min':
                  case 'm':
                    return n * s
                  case 'seconds':
                  case 'second':
                  case 'secs':
                  case 'sec':
                  case 's':
                    return n * r
                  case 'milliseconds':
                  case 'millisecond':
                  case 'msecs':
                  case 'msec':
                  case 'ms':
                    return n
                  default:
                    return
                }
              })(e)
            if ('number' === n && isFinite(e))
              return t.long
                ? (function (e) {
                    var t = Math.abs(e)
                    if (t >= o) return a(e, t, o, 'day')
                    if (t >= i) return a(e, t, i, 'hour')
                    if (t >= s) return a(e, t, s, 'minute')
                    if (t >= r) return a(e, t, r, 'second')
                    return e + ' ms'
                  })(e)
                : (function (e) {
                    var t = Math.abs(e)
                    if (t >= o) return Math.round(e / o) + 'd'
                    if (t >= i) return Math.round(e / i) + 'h'
                    if (t >= s) return Math.round(e / s) + 'm'
                    if (t >= r) return Math.round(e / r) + 's'
                    return e + 'ms'
                  })(e)
            throw new Error(
              'val is not a non-empty string or a valid number. val=' +
                JSON.stringify(e)
            )
          }
        },
        {}
      ],
      35: [
        function (e, t, n) {
          var r,
            s,
            i = (t.exports = {})
          function o () {
            throw new Error('setTimeout has not been defined')
          }
          function l () {
            throw new Error('clearTimeout has not been defined')
          }
          function u (e) {
            if (r === setTimeout) return setTimeout(e, 0)
            if ((r === o || !r) && setTimeout)
              return (r = setTimeout), setTimeout(e, 0)
            try {
              return r(e, 0)
            } catch (t) {
              try {
                return r.call(null, e, 0)
              } catch (t) {
                return r.call(this, e, 0)
              }
            }
          }
          !(function () {
            try {
              r = 'function' == typeof setTimeout ? setTimeout : o
            } catch (e) {
              r = o
            }
            try {
              s = 'function' == typeof clearTimeout ? clearTimeout : l
            } catch (e) {
              s = l
            }
          })()
          var a,
            c = [],
            h = !1,
            d = -1
          function f () {
            h &&
              a &&
              ((h = !1),
              a.length ? (c = a.concat(c)) : (d = -1),
              c.length && _())
          }
          function _ () {
            if (!h) {
              var e = u(f)
              h = !0
              for (var t = c.length; t; ) {
                for (a = c, c = []; ++d < t; ) a && a[d].run()
                ;(d = -1), (t = c.length)
              }
              ;(a = null),
                (h = !1),
                (function (e) {
                  if (s === clearTimeout) return clearTimeout(e)
                  if ((s === l || !s) && clearTimeout)
                    return (s = clearTimeout), clearTimeout(e)
                  try {
                    s(e)
                  } catch (t) {
                    try {
                      return s.call(null, e)
                    } catch (t) {
                      return s.call(this, e)
                    }
                  }
                })(e)
            }
          }
          function p (e, t) {
            ;(this.fun = e), (this.array = t)
          }
          function m () {}
          ;(i.nextTick = function (e) {
            var t = new Array(arguments.length - 1)
            if (arguments.length > 1)
              for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]
            c.push(new p(e, t)), 1 !== c.length || h || u(_)
          }),
            (p.prototype.run = function () {
              this.fun.apply(null, this.array)
            }),
            (i.title = 'browser'),
            (i.browser = !0),
            (i.env = {}),
            (i.argv = []),
            (i.version = ''),
            (i.versions = {}),
            (i.on = m),
            (i.addListener = m),
            (i.once = m),
            (i.off = m),
            (i.removeListener = m),
            (i.removeAllListeners = m),
            (i.emit = m),
            (i.prependListener = m),
            (i.prependOnceListener = m),
            (i.listeners = function (e) {
              return []
            }),
            (i.binding = function (e) {
              throw new Error('process.binding is not supported')
            }),
            (i.cwd = function () {
              return '/'
            }),
            (i.chdir = function (e) {
              throw new Error('process.chdir is not supported')
            }),
            (i.umask = function () {
              return 0
            })
        },
        {}
      ],
      36: [
        function (e, t, n) {
          var r = (t.exports = {
            v: [{ name: 'version', reg: /^(\d*)$/ }],
            o: [
              {
                name: 'origin',
                reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
                names: [
                  'username',
                  'sessionId',
                  'sessionVersion',
                  'netType',
                  'ipVer',
                  'address'
                ],
                format: '%s %s %d %s IP%d %s'
              }
            ],
            s: [{ name: 'name' }],
            i: [{ name: 'description' }],
            u: [{ name: 'uri' }],
            e: [{ name: 'email' }],
            p: [{ name: 'phone' }],
            z: [{ name: 'timezones' }],
            r: [{ name: 'repeats' }],
            t: [
              {
                name: 'timing',
                reg: /^(\d*) (\d*)/,
                names: ['start', 'stop'],
                format: '%d %d'
              }
            ],
            c: [
              {
                name: 'connection',
                reg: /^IN IP(\d) (\S*)/,
                names: ['version', 'ip'],
                format: 'IN IP%d %s'
              }
            ],
            b: [
              {
                push: 'bandwidth',
                reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
                names: ['type', 'limit'],
                format: '%s:%s'
              }
            ],
            m: [
              {
                reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
                names: ['type', 'port', 'protocol', 'payloads'],
                format: '%s %d %s %s'
              }
            ],
            a: [
              {
                push: 'rtp',
                reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
                names: ['payload', 'codec', 'rate', 'encoding'],
                format: function (e) {
                  return e.encoding
                    ? 'rtpmap:%d %s/%s/%s'
                    : e.rate
                    ? 'rtpmap:%d %s/%s'
                    : 'rtpmap:%d %s'
                }
              },
              {
                push: 'fmtp',
                reg: /^fmtp:(\d*) ([\S| ]*)/,
                names: ['payload', 'config'],
                format: 'fmtp:%d %s'
              },
              { name: 'control', reg: /^control:(.*)/, format: 'control:%s' },
              {
                name: 'rtcp',
                reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
                names: ['port', 'netType', 'ipVer', 'address'],
                format: function (e) {
                  return null != e.address ? 'rtcp:%d %s IP%d %s' : 'rtcp:%d'
                }
              },
              {
                push: 'rtcpFbTrrInt',
                reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
                names: ['payload', 'value'],
                format: 'rtcp-fb:%d trr-int %d'
              },
              {
                push: 'rtcpFb',
                reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
                names: ['payload', 'type', 'subtype'],
                format: function (e) {
                  return null != e.subtype
                    ? 'rtcp-fb:%s %s %s'
                    : 'rtcp-fb:%s %s'
                }
              },
              {
                push: 'ext',
                reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
                names: ['value', 'direction', 'encrypt-uri', 'uri', 'config'],
                format: function (e) {
                  return (
                    'extmap:%d' +
                    (e.direction ? '/%s' : '%v') +
                    (e['encrypt-uri'] ? ' %s' : '%v') +
                    ' %s' +
                    (e.config ? ' %s' : '')
                  )
                }
              },
              { name: 'extmapAllowMixed', reg: /^(extmap-allow-mixed)/ },
              {
                push: 'crypto',
                reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
                names: ['id', 'suite', 'config', 'sessionConfig'],
                format: function (e) {
                  return null != e.sessionConfig
                    ? 'crypto:%d %s %s %s'
                    : 'crypto:%d %s %s'
                }
              },
              { name: 'setup', reg: /^setup:(\w*)/, format: 'setup:%s' },
              {
                name: 'connectionType',
                reg: /^connection:(new|existing)/,
                format: 'connection:%s'
              },
              { name: 'mid', reg: /^mid:([^\s]*)/, format: 'mid:%s' },
              { name: 'msid', reg: /^msid:(.*)/, format: 'msid:%s' },
              {
                name: 'ptime',
                reg: /^ptime:(\d*(?:\.\d*)*)/,
                format: 'ptime:%d'
              },
              {
                name: 'maxptime',
                reg: /^maxptime:(\d*(?:\.\d*)*)/,
                format: 'maxptime:%d'
              },
              {
                name: 'direction',
                reg: /^(sendrecv|recvonly|sendonly|inactive)/
              },
              { name: 'icelite', reg: /^(ice-lite)/ },
              {
                name: 'iceUfrag',
                reg: /^ice-ufrag:(\S*)/,
                format: 'ice-ufrag:%s'
              },
              { name: 'icePwd', reg: /^ice-pwd:(\S*)/, format: 'ice-pwd:%s' },
              {
                name: 'fingerprint',
                reg: /^fingerprint:(\S*) (\S*)/,
                names: ['type', 'hash'],
                format: 'fingerprint:%s %s'
              },
              {
                push: 'candidates',
                reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
                names: [
                  'foundation',
                  'component',
                  'transport',
                  'priority',
                  'ip',
                  'port',
                  'type',
                  'raddr',
                  'rport',
                  'tcptype',
                  'generation',
                  'network-id',
                  'network-cost'
                ],
                format: function (e) {
                  var t = 'candidate:%s %d %s %d %s %d typ %s'
                  return (
                    (t += null != e.raddr ? ' raddr %s rport %d' : '%v%v'),
                    (t += null != e.tcptype ? ' tcptype %s' : '%v'),
                    null != e.generation && (t += ' generation %d'),
                    (t += null != e['network-id'] ? ' network-id %d' : '%v'),
                    (t += null != e['network-cost'] ? ' network-cost %d' : '%v')
                  )
                }
              },
              { name: 'endOfCandidates', reg: /^(end-of-candidates)/ },
              {
                name: 'remoteCandidates',
                reg: /^remote-candidates:(.*)/,
                format: 'remote-candidates:%s'
              },
              {
                name: 'iceOptions',
                reg: /^ice-options:(\S*)/,
                format: 'ice-options:%s'
              },
              {
                push: 'ssrcs',
                reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
                names: ['id', 'attribute', 'value'],
                format: function (e) {
                  var t = 'ssrc:%d'
                  return (
                    null != e.attribute &&
                      ((t += ' %s'), null != e.value && (t += ':%s')),
                    t
                  )
                }
              },
              {
                push: 'ssrcGroups',
                reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
                names: ['semantics', 'ssrcs'],
                format: 'ssrc-group:%s %s'
              },
              {
                name: 'msidSemantic',
                reg: /^msid-semantic:\s?(\w*) (\S*)/,
                names: ['semantic', 'token'],
                format: 'msid-semantic: %s %s'
              },
              {
                push: 'groups',
                reg: /^group:(\w*) (.*)/,
                names: ['type', 'mids'],
                format: 'group:%s %s'
              },
              { name: 'rtcpMux', reg: /^(rtcp-mux)/ },
              { name: 'rtcpRsize', reg: /^(rtcp-rsize)/ },
              {
                name: 'sctpmap',
                reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
                names: ['sctpmapNumber', 'app', 'maxMessageSize'],
                format: function (e) {
                  return null != e.maxMessageSize
                    ? 'sctpmap:%s %s %s'
                    : 'sctpmap:%s %s'
                }
              },
              {
                name: 'xGoogleFlag',
                reg: /^x-google-flag:([^\s]*)/,
                format: 'x-google-flag:%s'
              },
              {
                push: 'rids',
                reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
                names: ['id', 'direction', 'params'],
                format: function (e) {
                  return e.params ? 'rid:%s %s %s' : 'rid:%s %s'
                }
              },
              {
                push: 'imageattrs',
                reg: new RegExp(
                  '^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?'
                ),
                names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
                format: function (e) {
                  return 'imageattr:%s %s %s' + (e.dir2 ? ' %s %s' : '')
                }
              },
              {
                name: 'simulcast',
                reg: new RegExp(
                  '^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$'
                ),
                names: ['dir1', 'list1', 'dir2', 'list2'],
                format: function (e) {
                  return 'simulcast:%s %s' + (e.dir2 ? ' %s %s' : '')
                }
              },
              {
                name: 'simulcast_03',
                reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
                names: ['value'],
                format: 'simulcast: %s'
              },
              {
                name: 'framerate',
                reg: /^framerate:(\d+(?:$|\.\d+))/,
                format: 'framerate:%s'
              },
              {
                name: 'sourceFilter',
                reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
                names: [
                  'filterMode',
                  'netType',
                  'addressTypes',
                  'destAddress',
                  'srcList'
                ],
                format: 'source-filter: %s %s %s %s %s'
              },
              { name: 'bundleOnly', reg: /^(bundle-only)/ },
              { name: 'label', reg: /^label:(.+)/, format: 'label:%s' },
              {
                name: 'sctpPort',
                reg: /^sctp-port:(\d+)$/,
                format: 'sctp-port:%s'
              },
              {
                name: 'maxMessageSize',
                reg: /^max-message-size:(\d+)$/,
                format: 'max-message-size:%s'
              },
              {
                push: 'tsRefClocks',
                reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
                names: ['clksrc', 'clksrcExt'],
                format: function (e) {
                  return 'ts-refclk:%s' + (null != e.clksrcExt ? '=%s' : '')
                }
              },
              {
                name: 'mediaClk',
                reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
                names: [
                  'id',
                  'mediaClockName',
                  'mediaClockValue',
                  'rateNumerator',
                  'rateDenominator'
                ],
                format: function (e) {
                  var t = 'mediaclk:'
                  return (
                    (t += null != e.id ? 'id=%s %s' : '%v%s'),
                    (t += null != e.mediaClockValue ? '=%s' : ''),
                    (t += null != e.rateNumerator ? ' rate=%s' : ''),
                    (t += null != e.rateDenominator ? '/%s' : '')
                  )
                }
              },
              { name: 'keywords', reg: /^keywds:(.+)$/, format: 'keywds:%s' },
              { name: 'content', reg: /^content:(.+)/, format: 'content:%s' },
              {
                name: 'bfcpFloorCtrl',
                reg: /^floorctrl:(c-only|s-only|c-s)/,
                format: 'floorctrl:%s'
              },
              { name: 'bfcpConfId', reg: /^confid:(\d+)/, format: 'confid:%s' },
              { name: 'bfcpUserId', reg: /^userid:(\d+)/, format: 'userid:%s' },
              {
                name: 'bfcpFloorId',
                reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
                names: ['id', 'mStream'],
                format: 'floorid:%s mstrm:%s'
              },
              { push: 'invalid', names: ['value'] }
            ]
          })
          Object.keys(r).forEach(function (e) {
            r[e].forEach(function (e) {
              e.reg || (e.reg = /(.*)/), e.format || (e.format = '%s')
            })
          })
        },
        {}
      ],
      37: [
        function (e, t, n) {
          var r = e('./parser'),
            s = e('./writer')
          ;(n.write = s),
            (n.parse = r.parse),
            (n.parseParams = r.parseParams),
            (n.parseFmtpConfig = r.parseFmtpConfig),
            (n.parsePayloads = r.parsePayloads),
            (n.parseRemoteCandidates = r.parseRemoteCandidates),
            (n.parseImageAttributes = r.parseImageAttributes),
            (n.parseSimulcastStreamList = r.parseSimulcastStreamList)
        },
        { './parser': 38, './writer': 39 }
      ],
      38: [
        function (e, t, n) {
          var r = function (e) {
              return String(Number(e)) === e ? Number(e) : e
            },
            s = function (e, t, n) {
              var s = e.name && e.names
              e.push && !t[e.push]
                ? (t[e.push] = [])
                : s && !t[e.name] && (t[e.name] = {})
              var i = e.push ? {} : s ? t[e.name] : t
              !(function (e, t, n, s) {
                if (s && !n) t[s] = r(e[1])
                else
                  for (var i = 0; i < n.length; i += 1)
                    null != e[i + 1] && (t[n[i]] = r(e[i + 1]))
              })(n.match(e.reg), i, e.names, e.name),
                e.push && t[e.push].push(i)
            },
            i = e('./grammar'),
            o = RegExp.prototype.test.bind(/^([a-z])=(.*)/)
          n.parse = function (e) {
            var t = {},
              n = [],
              r = t
            return (
              e
                .split(/(\r\n|\r|\n)/)
                .filter(o)
                .forEach(function (e) {
                  var t = e[0],
                    o = e.slice(2)
                  'm' === t &&
                    (n.push({ rtp: [], fmtp: [] }), (r = n[n.length - 1]))
                  for (var l = 0; l < (i[t] || []).length; l += 1) {
                    var u = i[t][l]
                    if (u.reg.test(o)) return s(u, r, o)
                  }
                }),
              (t.media = n),
              t
            )
          }
          var l = function (e, t) {
            var n = t.split(/=(.+)/, 2)
            return (
              2 === n.length
                ? (e[n[0]] = r(n[1]))
                : 1 === n.length && t.length > 1 && (e[n[0]] = void 0),
              e
            )
          }
          ;(n.parseParams = function (e) {
            return e.split(/;\s?/).reduce(l, {})
          }),
            (n.parseFmtpConfig = n.parseParams),
            (n.parsePayloads = function (e) {
              return e
                .toString()
                .split(' ')
                .map(Number)
            }),
            (n.parseRemoteCandidates = function (e) {
              for (
                var t = [], n = e.split(' ').map(r), s = 0;
                s < n.length;
                s += 3
              )
                t.push({ component: n[s], ip: n[s + 1], port: n[s + 2] })
              return t
            }),
            (n.parseImageAttributes = function (e) {
              return e.split(' ').map(function (e) {
                return e
                  .substring(1, e.length - 1)
                  .split(',')
                  .reduce(l, {})
              })
            }),
            (n.parseSimulcastStreamList = function (e) {
              return e.split(';').map(function (e) {
                return e.split(',').map(function (e) {
                  var t,
                    n = !1
                  return (
                    '~' !== e[0]
                      ? (t = r(e))
                      : ((t = r(e.substring(1, e.length))), (n = !0)),
                    { scid: t, paused: n }
                  )
                })
              })
            })
        },
        { './grammar': 36 }
      ],
      39: [
        function (e, t, n) {
          var r = e('./grammar'),
            s = /%[sdv%]/g,
            i = function (e, t, n) {
              var r = [
                e +
                  '=' +
                  (t.format instanceof Function
                    ? t.format(t.push ? n : n[t.name])
                    : t.format)
              ]
              if (t.names)
                for (var i = 0; i < t.names.length; i += 1) {
                  var o = t.names[i]
                  t.name ? r.push(n[t.name][o]) : r.push(n[t.names[i]])
                }
              else r.push(n[t.name])
              return function (e) {
                var t = 1,
                  n = arguments,
                  r = n.length
                return e.replace(s, function (e) {
                  if (t >= r) return e
                  var s = n[t]
                  switch (((t += 1), e)) {
                    case '%%':
                      return '%'
                    case '%s':
                      return String(s)
                    case '%d':
                      return Number(s)
                    case '%v':
                      return ''
                  }
                })
              }.apply(null, r)
            },
            o = [
              'v',
              'o',
              's',
              'i',
              'u',
              'e',
              'p',
              'c',
              'b',
              't',
              'r',
              'z',
              'a'
            ],
            l = ['i', 'c', 'b', 'a']
          t.exports = function (e, t) {
            ;(t = t || {}),
              null == e.version && (e.version = 0),
              null == e.name && (e.name = ' '),
              e.media.forEach(function (e) {
                null == e.payloads && (e.payloads = '')
              })
            var n = t.outerOrder || o,
              s = t.innerOrder || l,
              u = []
            return (
              n.forEach(function (t) {
                r[t].forEach(function (n) {
                  n.name in e && null != e[n.name]
                    ? u.push(i(t, n, e))
                    : n.push in e &&
                      null != e[n.push] &&
                      e[n.push].forEach(function (e) {
                        u.push(i(t, n, e))
                      })
                })
              }),
              e.media.forEach(function (e) {
                u.push(i('m', r.m[0], e)),
                  s.forEach(function (t) {
                    r[t].forEach(function (n) {
                      n.name in e && null != e[n.name]
                        ? u.push(i(t, n, e))
                        : n.push in e &&
                          null != e[n.push] &&
                          e[n.push].forEach(function (e) {
                            u.push(i(t, n, e))
                          })
                    })
                  })
              }),
              u.join('\r\n') + '\r\n'
            )
          }
        },
        { './grammar': 36 }
      ],
      40: [
        function (e, t, n) {
          t.exports = {
            name: 'jssip',
            title: 'JsSIP',
            description: 'the Javascript SIP library',
            version: '3.9.1',
            homepage: 'https://jssip.net',
            contributors: [
              'JosÃ© Luis MillÃ¡n <jmillan@aliax.net> (https://github.com/jmillan)',
              'IÃ±aki Baz Castillo <ibc@aliax.net> (https://inakibaz.me)'
            ],
            types: 'lib/JsSIP.d.ts',
            main: 'lib-es5/JsSIP.js',
            keywords: [
              'sip',
              'websocket',
              'webrtc',
              'node',
              'browser',
              'library'
            ],
            license: 'MIT',
            repository: {
              type: 'git',
              url: 'https://github.com/versatica/JsSIP.git'
            },
            bugs: { url: 'https://github.com/versatica/JsSIP/issues' },
            dependencies: {
              '@types/debug': '^4.1.5',
              '@types/node': '^14.14.34',
              debug: '^4.3.1',
              events: '^3.3.0',
              'sdp-transform': '^2.14.1'
            },
            devDependencies: {
              '@babel/core': '^7.13.10',
              '@babel/preset-env': '^7.13.10',
              'ansi-colors': '^3.2.4',
              browserify: '^16.5.1',
              eslint: '^5.16.0',
              'fancy-log': '^1.3.3',
              gulp: '^4.0.2',
              'gulp-babel': '^8.0.0',
              'gulp-eslint': '^5.0.0',
              'gulp-expect-file': '^1.0.2',
              'gulp-header': '^2.0.9',
              'gulp-nodeunit-runner': '^0.2.2',
              'gulp-plumber': '^1.2.1',
              'gulp-rename': '^1.4.0',
              'gulp-uglify-es': '^1.0.4',
              pegjs: '^0.7.0',
              'vinyl-buffer': '^1.0.1',
              'vinyl-source-stream': '^2.0.0'
            },
            scripts: {
              lint: 'gulp lint',
              test: 'gulp test',
              prepublishOnly: 'gulp babel'
            }
          }
        },
        {}
      ]
    },
    {},
    [8]
  )(8)
})

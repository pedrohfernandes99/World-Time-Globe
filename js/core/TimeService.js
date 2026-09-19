// World Time Globe - Sprint 27
// Serviço de horário mundial usando a API Intl + fusos IANA disponíveis no navegador.

const TimeService = {

    zonesByCountry: {
    "AD": [
        "Europe/Andorra"
    ],
    "AE": [
        "Asia/Dubai"
    ],
    "AF": [
        "Asia/Kabul"
    ],
    "AG": [
        "America/Antigua"
    ],
    "AI": [
        "America/Anguilla"
    ],
    "AL": [
        "Europe/Tirane"
    ],
    "AM": [
        "Asia/Yerevan"
    ],
    "AO": [
        "Africa/Luanda"
    ],
    "AQ": [
        "Antarctica/McMurdo",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Mawson",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok"
    ],
    "AR": [
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Cordoba",
        "America/Argentina/Salta",
        "America/Argentina/Jujuy",
        "America/Argentina/Tucuman",
        "America/Argentina/Catamarca",
        "America/Argentina/La_Rioja",
        "America/Argentina/San_Juan",
        "America/Argentina/Mendoza",
        "America/Argentina/San_Luis",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Ushuaia"
    ],
    "AS": [
        "Pacific/Pago_Pago"
    ],
    "AT": [
        "Europe/Vienna"
    ],
    "AU": [
        "Australia/Lord_Howe",
        "Antarctica/Macquarie",
        "Australia/Hobart",
        "Australia/Melbourne",
        "Australia/Sydney",
        "Australia/Broken_Hill",
        "Australia/Brisbane",
        "Australia/Lindeman",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Perth",
        "Australia/Eucla"
    ],
    "AW": [
        "America/Aruba"
    ],
    "AX": [
        "Europe/Mariehamn"
    ],
    "AZ": [
        "Asia/Baku"
    ],
    "BA": [
        "Europe/Sarajevo"
    ],
    "BB": [
        "America/Barbados"
    ],
    "BD": [
        "Asia/Dhaka"
    ],
    "BE": [
        "Europe/Brussels"
    ],
    "BF": [
        "Africa/Ouagadougou"
    ],
    "BG": [
        "Europe/Sofia"
    ],
    "BH": [
        "Asia/Bahrain"
    ],
    "BI": [
        "Africa/Bujumbura"
    ],
    "BJ": [
        "Africa/Porto-Novo"
    ],
    "BL": [
        "America/St_Barthelemy"
    ],
    "BM": [
        "Atlantic/Bermuda"
    ],
    "BN": [
        "Asia/Brunei"
    ],
    "BO": [
        "America/La_Paz"
    ],
    "BQ": [
        "America/Kralendijk"
    ],
    "BR": [
        "America/Noronha",
        "America/Belem",
        "America/Fortaleza",
        "America/Recife",
        "America/Araguaina",
        "America/Maceio",
        "America/Bahia",
        "America/Sao_Paulo",
        "America/Campo_Grande",
        "America/Cuiaba",
        "America/Santarem",
        "America/Porto_Velho",
        "America/Boa_Vista",
        "America/Manaus",
        "America/Eirunepe",
        "America/Rio_Branco"
    ],
    "BS": [
        "America/Nassau"
    ],
    "BT": [
        "Asia/Thimphu"
    ],
    "BW": [
        "Africa/Gaborone"
    ],
    "BY": [
        "Europe/Minsk"
    ],
    "BZ": [
        "America/Belize"
    ],
    "CA": [
        "America/St_Johns",
        "America/Halifax",
        "America/Glace_Bay",
        "America/Moncton",
        "America/Goose_Bay",
        "America/Blanc-Sablon",
        "America/Toronto",
        "America/Iqaluit",
        "America/Atikokan",
        "America/Winnipeg",
        "America/Resolute",
        "America/Rankin_Inlet",
        "America/Regina",
        "America/Swift_Current",
        "America/Edmonton",
        "America/Cambridge_Bay",
        "America/Inuvik",
        "America/Creston",
        "America/Dawson_Creek",
        "America/Fort_Nelson",
        "America/Whitehorse",
        "America/Dawson",
        "America/Vancouver"
    ],
    "CC": [
        "Indian/Cocos"
    ],
    "CD": [
        "Africa/Kinshasa",
        "Africa/Lubumbashi"
    ],
    "CF": [
        "Africa/Bangui"
    ],
    "CG": [
        "Africa/Brazzaville"
    ],
    "CH": [
        "Europe/Zurich"
    ],
    "CI": [
        "Africa/Abidjan"
    ],
    "CK": [
        "Pacific/Rarotonga"
    ],
    "CL": [
        "America/Santiago",
        "America/Coyhaique",
        "America/Punta_Arenas",
        "Pacific/Easter"
    ],
    "CM": [
        "Africa/Douala"
    ],
    "CN": [
        "Asia/Shanghai",
        "Asia/Urumqi"
    ],
    "CO": [
        "America/Bogota"
    ],
    "CR": [
        "America/Costa_Rica"
    ],
    "CU": [
        "America/Havana"
    ],
    "CV": [
        "Atlantic/Cape_Verde"
    ],
    "CW": [
        "America/Curacao"
    ],
    "CX": [
        "Indian/Christmas"
    ],
    "CY": [
        "Asia/Nicosia",
        "Asia/Famagusta"
    ],
    "CZ": [
        "Europe/Prague"
    ],
    "DE": [
        "Europe/Berlin",
        "Europe/Busingen"
    ],
    "DJ": [
        "Africa/Djibouti"
    ],
    "DK": [
        "Europe/Copenhagen"
    ],
    "DM": [
        "America/Dominica"
    ],
    "DO": [
        "America/Santo_Domingo"
    ],
    "DZ": [
        "Africa/Algiers"
    ],
    "EC": [
        "America/Guayaquil",
        "Pacific/Galapagos"
    ],
    "EE": [
        "Europe/Tallinn"
    ],
    "EG": [
        "Africa/Cairo"
    ],
    "EH": [
        "Africa/El_Aaiun"
    ],
    "ER": [
        "Africa/Asmara"
    ],
    "ES": [
        "Europe/Madrid",
        "Africa/Ceuta",
        "Atlantic/Canary"
    ],
    "ET": [
        "Africa/Addis_Ababa"
    ],
    "FI": [
        "Europe/Helsinki"
    ],
    "FJ": [
        "Pacific/Fiji"
    ],
    "FK": [
        "Atlantic/Stanley"
    ],
    "FM": [
        "Pacific/Chuuk",
        "Pacific/Pohnpei",
        "Pacific/Kosrae"
    ],
    "FO": [
        "Atlantic/Faroe"
    ],
    "FR": [
        "Europe/Paris"
    ],
    "GA": [
        "Africa/Libreville"
    ],
    "GB": [
        "Europe/London"
    ],
    "GD": [
        "America/Grenada"
    ],
    "GE": [
        "Asia/Tbilisi"
    ],
    "GF": [
        "America/Cayenne"
    ],
    "GG": [
        "Europe/Guernsey"
    ],
    "GH": [
        "Africa/Accra"
    ],
    "GI": [
        "Europe/Gibraltar"
    ],
    "GL": [
        "America/Nuuk",
        "America/Danmarkshavn",
        "America/Scoresbysund",
        "America/Thule"
    ],
    "GM": [
        "Africa/Banjul"
    ],
    "GN": [
        "Africa/Conakry"
    ],
    "GP": [
        "America/Guadeloupe"
    ],
    "GQ": [
        "Africa/Malabo"
    ],
    "GR": [
        "Europe/Athens"
    ],
    "GS": [
        "Atlantic/South_Georgia"
    ],
    "GT": [
        "America/Guatemala"
    ],
    "GU": [
        "Pacific/Guam"
    ],
    "GW": [
        "Africa/Bissau"
    ],
    "GY": [
        "America/Guyana"
    ],
    "HK": [
        "Asia/Hong_Kong"
    ],
    "HN": [
        "America/Tegucigalpa"
    ],
    "HR": [
        "Europe/Zagreb"
    ],
    "HT": [
        "America/Port-au-Prince"
    ],
    "HU": [
        "Europe/Budapest"
    ],
    "ID": [
        "Asia/Jakarta",
        "Asia/Pontianak",
        "Asia/Makassar",
        "Asia/Jayapura"
    ],
    "IE": [
        "Europe/Dublin"
    ],
    "IL": [
        "Asia/Jerusalem"
    ],
    "IM": [
        "Europe/Isle_of_Man"
    ],
    "IN": [
        "Asia/Kolkata"
    ],
    "IO": [
        "Indian/Chagos"
    ],
    "IQ": [
        "Asia/Baghdad"
    ],
    "IR": [
        "Asia/Tehran"
    ],
    "IS": [
        "Atlantic/Reykjavik"
    ],
    "IT": [
        "Europe/Rome"
    ],
    "JE": [
        "Europe/Jersey"
    ],
    "JM": [
        "America/Jamaica"
    ],
    "JO": [
        "Asia/Amman"
    ],
    "JP": [
        "Asia/Tokyo"
    ],
    "KE": [
        "Africa/Nairobi"
    ],
    "KG": [
        "Asia/Bishkek"
    ],
    "KH": [
        "Asia/Phnom_Penh"
    ],
    "KI": [
        "Pacific/Tarawa",
        "Pacific/Kanton",
        "Pacific/Kiritimati"
    ],
    "KM": [
        "Indian/Comoro"
    ],
    "KN": [
        "America/St_Kitts"
    ],
    "KP": [
        "Asia/Pyongyang"
    ],
    "KR": [
        "Asia/Seoul"
    ],
    "KW": [
        "Asia/Kuwait"
    ],
    "KY": [
        "America/Cayman"
    ],
    "KZ": [
        "Asia/Almaty",
        "Asia/Qyzylorda",
        "Asia/Qostanay",
        "Asia/Aqtobe",
        "Asia/Aqtau",
        "Asia/Atyrau",
        "Asia/Oral"
    ],
    "LA": [
        "Asia/Vientiane"
    ],
    "LB": [
        "Asia/Beirut"
    ],
    "LC": [
        "America/St_Lucia"
    ],
    "LI": [
        "Europe/Vaduz"
    ],
    "LK": [
        "Asia/Colombo"
    ],
    "LR": [
        "Africa/Monrovia"
    ],
    "LS": [
        "Africa/Maseru"
    ],
    "LT": [
        "Europe/Vilnius"
    ],
    "LU": [
        "Europe/Luxembourg"
    ],
    "LV": [
        "Europe/Riga"
    ],
    "LY": [
        "Africa/Tripoli"
    ],
    "MA": [
        "Africa/Casablanca"
    ],
    "MC": [
        "Europe/Monaco"
    ],
    "MD": [
        "Europe/Chisinau"
    ],
    "ME": [
        "Europe/Podgorica"
    ],
    "MF": [
        "America/Marigot"
    ],
    "MG": [
        "Indian/Antananarivo"
    ],
    "MH": [
        "Pacific/Majuro",
        "Pacific/Kwajalein"
    ],
    "MK": [
        "Europe/Skopje"
    ],
    "ML": [
        "Africa/Bamako"
    ],
    "MM": [
        "Asia/Yangon"
    ],
    "MN": [
        "Asia/Ulaanbaatar",
        "Asia/Hovd"
    ],
    "MO": [
        "Asia/Macau"
    ],
    "MP": [
        "Pacific/Saipan"
    ],
    "MQ": [
        "America/Martinique"
    ],
    "MR": [
        "Africa/Nouakchott"
    ],
    "MS": [
        "America/Montserrat"
    ],
    "MT": [
        "Europe/Malta"
    ],
    "MU": [
        "Indian/Mauritius"
    ],
    "MV": [
        "Indian/Maldives"
    ],
    "MW": [
        "Africa/Blantyre"
    ],
    "MX": [
        "America/Mexico_City",
        "America/Cancun",
        "America/Merida",
        "America/Monterrey",
        "America/Matamoros",
        "America/Chihuahua",
        "America/Ciudad_Juarez",
        "America/Ojinaga",
        "America/Mazatlan",
        "America/Bahia_Banderas",
        "America/Hermosillo",
        "America/Tijuana"
    ],
    "MY": [
        "Asia/Kuala_Lumpur",
        "Asia/Kuching"
    ],
    "MZ": [
        "Africa/Maputo"
    ],
    "NA": [
        "Africa/Windhoek"
    ],
    "NC": [
        "Pacific/Noumea"
    ],
    "NE": [
        "Africa/Niamey"
    ],
    "NF": [
        "Pacific/Norfolk"
    ],
    "NG": [
        "Africa/Lagos"
    ],
    "NI": [
        "America/Managua"
    ],
    "NL": [
        "Europe/Amsterdam"
    ],
    "NO": [
        "Europe/Oslo"
    ],
    "NP": [
        "Asia/Kathmandu"
    ],
    "NR": [
        "Pacific/Nauru"
    ],
    "NU": [
        "Pacific/Niue"
    ],
    "NZ": [
        "Pacific/Auckland",
        "Pacific/Chatham"
    ],
    "OM": [
        "Asia/Muscat"
    ],
    "PA": [
        "America/Panama"
    ],
    "PE": [
        "America/Lima"
    ],
    "PF": [
        "Pacific/Tahiti",
        "Pacific/Marquesas",
        "Pacific/Gambier"
    ],
    "PG": [
        "Pacific/Port_Moresby",
        "Pacific/Bougainville"
    ],
    "PH": [
        "Asia/Manila"
    ],
    "PK": [
        "Asia/Karachi"
    ],
    "PL": [
        "Europe/Warsaw"
    ],
    "PM": [
        "America/Miquelon"
    ],
    "PN": [
        "Pacific/Pitcairn"
    ],
    "PR": [
        "America/Puerto_Rico"
    ],
    "PS": [
        "Asia/Gaza",
        "Asia/Hebron"
    ],
    "PT": [
        "Europe/Lisbon",
        "Atlantic/Madeira",
        "Atlantic/Azores"
    ],
    "PW": [
        "Pacific/Palau"
    ],
    "PY": [
        "America/Asuncion"
    ],
    "QA": [
        "Asia/Qatar"
    ],
    "RE": [
        "Indian/Reunion"
    ],
    "RO": [
        "Europe/Bucharest"
    ],
    "RS": [
        "Europe/Belgrade"
    ],
    "RU": [
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Kirov",
        "Europe/Volgograd",
        "Europe/Astrakhan",
        "Europe/Saratov",
        "Europe/Ulyanovsk",
        "Europe/Samara",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Barnaul",
        "Asia/Tomsk",
        "Asia/Novokuznetsk",
        "Asia/Krasnoyarsk",
        "Asia/Irkutsk",
        "Asia/Chita",
        "Asia/Yakutsk",
        "Asia/Khandyga",
        "Asia/Vladivostok",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Sakhalin",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr"
    ],
    "UA": [
        "Europe/Simferopol",
        "Europe/Kyiv"
    ],
    "RW": [
        "Africa/Kigali"
    ],
    "SA": [
        "Asia/Riyadh"
    ],
    "SB": [
        "Pacific/Guadalcanal"
    ],
    "SC": [
        "Indian/Mahe"
    ],
    "SD": [
        "Africa/Khartoum"
    ],
    "SE": [
        "Europe/Stockholm"
    ],
    "SG": [
        "Asia/Singapore"
    ],
    "SH": [
        "Atlantic/St_Helena"
    ],
    "SI": [
        "Europe/Ljubljana"
    ],
    "SJ": [
        "Arctic/Longyearbyen"
    ],
    "SK": [
        "Europe/Bratislava"
    ],
    "SL": [
        "Africa/Freetown"
    ],
    "SM": [
        "Europe/San_Marino"
    ],
    "SN": [
        "Africa/Dakar"
    ],
    "SO": [
        "Africa/Mogadishu"
    ],
    "SR": [
        "America/Paramaribo"
    ],
    "SS": [
        "Africa/Juba"
    ],
    "ST": [
        "Africa/Sao_Tome"
    ],
    "SV": [
        "America/El_Salvador"
    ],
    "SX": [
        "America/Lower_Princes"
    ],
    "SY": [
        "Asia/Damascus"
    ],
    "SZ": [
        "Africa/Mbabane"
    ],
    "TC": [
        "America/Grand_Turk"
    ],
    "TD": [
        "Africa/Ndjamena"
    ],
    "TF": [
        "Indian/Kerguelen"
    ],
    "TG": [
        "Africa/Lome"
    ],
    "TH": [
        "Asia/Bangkok"
    ],
    "TJ": [
        "Asia/Dushanbe"
    ],
    "TK": [
        "Pacific/Fakaofo"
    ],
    "TL": [
        "Asia/Dili"
    ],
    "TM": [
        "Asia/Ashgabat"
    ],
    "TN": [
        "Africa/Tunis"
    ],
    "TO": [
        "Pacific/Tongatapu"
    ],
    "TR": [
        "Europe/Istanbul"
    ],
    "TT": [
        "America/Port_of_Spain"
    ],
    "TV": [
        "Pacific/Funafuti"
    ],
    "TW": [
        "Asia/Taipei"
    ],
    "TZ": [
        "Africa/Dar_es_Salaam"
    ],
    "UG": [
        "Africa/Kampala"
    ],
    "UM": [
        "Pacific/Midway",
        "Pacific/Wake"
    ],
    "US": [
        "America/New_York",
        "America/Detroit",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Indiana/Indianapolis",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Vevay",
        "America/Chicago",
        "America/Indiana/Tell_City",
        "America/Indiana/Knox",
        "America/Menominee",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/North_Dakota/Beulah",
        "America/Denver",
        "America/Boise",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "America/Juneau",
        "America/Sitka",
        "America/Metlakatla",
        "America/Yakutat",
        "America/Nome",
        "America/Adak",
        "Pacific/Honolulu"
    ],
    "UY": [
        "America/Montevideo"
    ],
    "UZ": [
        "Asia/Samarkand",
        "Asia/Tashkent"
    ],
    "VA": [
        "Europe/Vatican"
    ],
    "VC": [
        "America/St_Vincent"
    ],
    "VE": [
        "America/Caracas"
    ],
    "VG": [
        "America/Tortola"
    ],
    "VI": [
        "America/St_Thomas"
    ],
    "VN": [
        "Asia/Ho_Chi_Minh"
    ],
    "VU": [
        "Pacific/Efate"
    ],
    "WF": [
        "Pacific/Wallis"
    ],
    "WS": [
        "Pacific/Apia"
    ],
    "YE": [
        "Asia/Aden"
    ],
    "YT": [
        "Indian/Mayotte"
    ],
    "ZA": [
        "Africa/Johannesburg"
    ],
    "ZM": [
        "Africa/Lusaka"
    ],
    "ZW": [
        "Africa/Harare"
    ]
},

    getZones(iso2, fallbackTimezone) {
        const iso = String(iso2 || "").toUpperCase();
        const zones = this.zonesByCountry[iso];

        if (zones && zones.length) return zones;

        if (fallbackTimezone) {
            const offsets = String(fallbackTimezone).split(",").map(v => v.trim()).filter(Boolean);
            if (offsets.length) {
                return offsets.map((offset, index) => ({
                    fixed: true,
                    offset,
                    label: `UTC ${offset.replace("UTC", "") || "+00:00"}`,
                    id: `fixed-${iso || "XX"}-${index}`
                }));
            }
        }

        return [{ fixed: true, offset: "UTC+00:00", label: "UTC", id: "fixed-utc" }];
    },

    formatParts(date, timeZone) {
        const formatter = new Intl.DateTimeFormat("pt-BR", {
            timeZone, year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        });
        const parts = {};
        formatter.formatToParts(date).forEach(part => {
            if (part.type !== "literal") parts[part.type] = part.value;
        });
        return parts;
    },

    getOffsetMinutes(date, timeZone) {
        try {
            const parts = this.formatParts(date, timeZone);
            let hour = Number(parts.hour);
            if (hour === 24) hour = 0;

            const utcAsLocal = Date.UTC(
                Number(parts.year), Number(parts.month) - 1, Number(parts.day),
                hour, Number(parts.minute), Number(parts.second)
            );

            return Math.round((utcAsLocal - date.getTime()) / 60000);
        } catch (error) {
            return 0;
        }
    },

    formatOffset(minutes) {
        if (minutes === 0) return "UTC+00:00";
        const sign = minutes >= 0 ? "+" : "-";
        const absolute = Math.abs(minutes);
        const hours = Math.floor(absolute / 60);
        const mins = absolute % 60;
        return `UTC${sign}${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    },

    zoneLabel(zone) {
        const known = {
            "America/Sao_Paulo": "São Paulo",
            "America/New_York": "Nova York",
            "America/Los_Angeles": "Los Angeles",
            "America/Chicago": "Chicago",
            "America/Denver": "Denver",
            "America/Toronto": "Toronto",
            "America/Vancouver": "Vancouver",
            "America/Mexico_City": "Cidade do México",
            "America/Argentina/Buenos_Aires": "Buenos Aires",
            "America/Santiago": "Santiago",
            "America/Bogota": "Bogotá",
            "America/Lima": "Lima",
            "America/Caracas": "Caracas",
            "America/Anchorage": "Alasca",
            "Pacific/Honolulu": "Havaí",
            "Europe/London": "Londres",
            "Europe/Lisbon": "Lisboa",
            "Europe/Paris": "Paris",
            "Europe/Madrid": "Madri",
            "Europe/Berlin": "Berlim",
            "Europe/Rome": "Roma",
            "Europe/Moscow": "Moscou",
            "Europe/Athens": "Atenas",
            "Europe/Istanbul": "Istambul",
            "Asia/Tokyo": "Tóquio",
            "Asia/Seoul": "Seul",
            "Asia/Shanghai": "Xangai",
            "Asia/Hong_Kong": "Hong Kong",
            "Asia/Singapore": "Singapura",
            "Asia/Kolkata": "Índia",
            "Asia/Dubai": "Dubai",
            "Asia/Jerusalem": "Jerusalém",
            "Asia/Bangkok": "Bangkok",
            "Asia/Jakarta": "Jacarta",
            "Asia/Manila": "Manila",
            "Asia/Riyadh": "Riad",
            "Australia/Sydney": "Sydney",
            "Australia/Melbourne": "Melbourne",
            "Australia/Perth": "Perth",
            "Pacific/Auckland": "Auckland",
            "Africa/Cairo": "Cairo",
            "Africa/Johannesburg": "Joanesburgo",
            "Africa/Lagos": "Lagos",
            "Africa/Nairobi": "Nairóbi"
        };
        return known[zone] || zone.replace(/_/g, " ").replace(/\//g, " / ");
    },

    getZoneInfo(zoneEntry, date) {
        if (zoneEntry.fixed) {
            const match = String(zoneEntry.offset).match(/UTC([+-])(\d{2}):?(\d{2})?/);
            let minutes = 0;
            if (match) {
                minutes = Number(match[2]) * 60 + Number(match[3] || 0);
                if (match[1] === "-") minutes *= -1;
            }
            const utcTime = new Date(date.getTime() + minutes * 60000);
            const pad = value => String(value).padStart(2, "0");
            return {
                zone: zoneEntry.id, label: zoneEntry.label,
                time: `${pad(utcTime.getUTCHours())}:${pad(utcTime.getUTCMinutes())}:${pad(utcTime.getUTCSeconds())}`,
                date: `${pad(utcTime.getUTCDate())}/${pad(utcTime.getUTCMonth() + 1)}/${utcTime.getUTCFullYear()}`,
                offset: this.formatOffset(minutes), offsetMinutes: minutes, daylightSaving: false
            };
        }

        const offset = this.getOffsetMinutes(date, zoneEntry);
        const jan = this.getOffsetMinutes(new Date(date.getFullYear(), 0, 1), zoneEntry);
        const jul = this.getOffsetMinutes(new Date(date.getFullYear(), 6, 1), zoneEntry);
        const observesDST = jan !== jul;
        const daylightSaving = observesDST && offset === Math.max(jan, jul);

        const parts = this.formatParts(date, zoneEntry);

        return {
            zone: zoneEntry, label: this.zoneLabel(zoneEntry),
            time: `${parts.hour}:${parts.minute}:${parts.second}`,
            date: `${parts.day}/${parts.month}/${parts.year}`,
            offset: this.formatOffset(offset), offsetMinutes: offset, daylightSaving
        };
    },

    getCountryTimes(country) {
        if (!country) return [];
        const properties = country.properties || {};
        const iso = properties["ISO3166-1-Alpha-2"] || "";
        const info = CountryDatabase.get(iso, properties.name || "");
        const fallback = info ? info.timezone : "";
        const zones = this.getZones(info?.iso2 || iso, fallback);
        const now = new Date();
        return zones.map(zone => this.getZoneInfo(zone, now));
    }
};

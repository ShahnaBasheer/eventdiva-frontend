"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueVendorService = void 0;
const core_1 = require("@angular/core");
const environment_1 = require("../../../../../environments/environment");
let VenueVendorService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VenueVendorService = _classThis = class {
        constructor(http, router) {
            this.http = http;
            this.router = router;
            this._venueTypes = [
                { value: 'Conference Center', label: 'Conference Center' },
                { value: 'Resort', label: 'Resort' },
                { value: 'Hotel', label: 'Hotel' },
                { value: 'Banquet Hall', label: 'Banquet Hall' },
                { value: 'Restaurant', label: 'Restaurant/Cafe' },
                { value: 'Community Center', label: 'Community Center' },
                { value: 'Auditorium', label: 'Auditorium' },
                { value: 'Convention Center', label: 'Convention Center' },
                { value: 'Outdoor Venue', label: 'Outdoor Venue' },
                { value: 'Corporate Office', label: 'Corporate Office' },
            ];
            this._amenities = [
                { name: 'Air Conditioning', selected: false },
                { name: 'Electricity', selected: false },
                { name: 'Heating', selected: false },
                { name: 'Garden', selected: false },
                { name: 'Dance Floor', selected: false },
                { name: 'Outdoor Seating', selected: false },
                { name: 'Smoking Area', selected: false },
                { name: 'Restrooms', selected: false },
                { name: 'Full Use of Kitchen', selected: false },
                { name: 'Microwave', selected: false },
                { name: 'Refrigerator Access', selected: false },
                { name: 'Ice Machine Access', selected: false },
                { name: 'Tables', selected: false },
                { name: 'Chairs', selected: false },
                { name: 'Stove', selected: false },
                { name: 'Oven', selected: false },
                { name: 'Sink', selected: false },
                { name: 'Parking Lot', selected: false },
                { name: 'Free Parking Garage', selected: false },
                { name: 'Open Area for Children', selected: false },
                { name: 'Playground', selected: false },
            ];
            this._services = [
                { name: 'Catering', selected: false },
                { name: 'Decoration', selected: false },
                { name: 'Alcohol Services', selected: false },
                { name: 'Audio/Visual Equipment', selected: false },
                { name: 'Event Planning', selected: false },
                { name: 'Photography', selected: false },
                { name: 'Videography', selected: false },
                { name: 'Security', selected: false },
                { name: 'Transportation', selected: false },
                { name: 'Cleaning Services', selected: false },
                { name: 'On-Site Coordinator', selected: false },
                { name: 'Wi-Fi Access', selected: false },
                { name: 'Cake', selected: false },
                { name: 'Entertainment', selected: false },
                { name: 'Setup and Takedown', selected: false },
                { name: 'Furniture Rental', selected: false },
                { name: 'Custom Lighting', selected: false }
            ];
            this.APIBASE_URL = `${environment_1.environment.vendorUrl}/venue-vendor`;
        }
        getDashboard() {
            return this.http.get(`${this.APIBASE_URL}/dashboard`, {
                withCredentials: true,
            });
        }
        getVenuTypes() {
            return this._venueTypes;
        }
        getAmenities() {
            return this._amenities;
        }
        getServices() {
            return this._services;
        }
        submitVenuForm(formData) {
            return this.http.post(`${this.APIBASE_URL}/venue-register/`, formData, {
                withCredentials: true,
            });
        }
        getVenueDetails() {
            return this.http.get(`${this.APIBASE_URL}/service/`, {
                withCredentials: true,
            });
        }
        getAvailabilityInfo() {
            return this.http.get(`${this.APIBASE_URL}/calendar/`, {
                withCredentials: true,
            });
        }
        getChatroom() {
            return this.http.get(`${environment_1.environment.vendorUrl}/chat-room/`, {
                withCredentials: true,
            });
        }
        addHoliday(date) {
            return this.http.patch(`${this.APIBASE_URL}/calendar/add-holiday/`, { date }, { withCredentials: true });
        }
        addNewEvent(formValue) {
            return this.http.patch(`${this.APIBASE_URL}/calendar/add-new-event/`, { formValue }, { withCredentials: true });
        }
    };
    __setFunctionName(_classThis, "VenueVendorService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueVendorService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueVendorService = _classThis;
})();
exports.VenueVendorService = VenueVendorService;

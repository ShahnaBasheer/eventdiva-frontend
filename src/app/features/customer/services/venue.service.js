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
exports.venueService = void 0;
const core_1 = require("@angular/core");
const environment_1 = require("../../../../environments/environment");
const rxjs_1 = require("rxjs");
let venueService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var venueService = _classThis = class {
        constructor(http) {
            this.http = http;
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
            // Create an observable to hold the current filters
            this.venuefiltersSubject = new rxjs_1.BehaviorSubject({
                services: [],
                amenities: [],
                venueTypes: [],
                location: ''
            });
            this.venuefilters$ = this.venuefiltersSubject.asObservable();
            this.APIBASE_URL = `${environment_1.environment.customerUrl}/vendors/venues`;
            this.APIBASE_VENUES_URL = `${environment_1.environment.customerUrl}/venues`;
            this.APIBASE_BOOKING_URL = `${environment_1.environment.customerUrl}/bookings/venue`;
        }
        getServices() {
            return this._services;
        }
        // Method to update the filters
        updateFilters(newFilters) {
            this.venuefiltersSubject.next(newFilters); // Emit the new filters
        }
        // Method to get the current filters' value
        getFilters() {
            return this.venuefiltersSubject.value;
        }
        getVenueDetails(slug) {
            return this.http.get(`${this.APIBASE_URL}/${slug}`, {
                withCredentials: true,
            });
        }
        getVenueBookingPage(slug) {
            return this.http.get(`${this.APIBASE_URL}/booking/${slug}`, {
                withCredentials: true,
            });
        }
        submitVenueBookingForm(formData, slug) {
            return this.http.post(`${this.APIBASE_VENUES_URL}/booking/payment/${slug}`, formData, {
                withCredentials: true,
            });
        }
        confirmRazorpayPayment(razorData) {
            return this.http.post(`${this.APIBASE_VENUES_URL}/booking/razorpay`, razorData, {
                withCredentials: true,
            });
        }
        checkAvailability(formData, vendorId) {
            return this.http.post(`${this.APIBASE_VENUES_URL}/check-availability/${vendorId}`, formData, {
                withCredentials: true,
            });
        }
        bookingDetails(bookingId) {
            return this.http.get(`${this.APIBASE_BOOKING_URL}/details/${bookingId}`, {
                withCredentials: true,
            });
        }
        payAdvancepayment(bookingId) {
            return this.http.get(`${this.APIBASE_BOOKING_URL}/advancepayment/${bookingId}`, {
                withCredentials: true,
            });
        }
        payFullpayment(bookingId) {
            return this.http.get(`${this.APIBASE_BOOKING_URL}/fullpayment/${bookingId}`, {
                withCredentials: true,
            });
        }
    };
    __setFunctionName(_classThis, "venueService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        venueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return venueService = _classThis;
})();
exports.venueService = venueService;

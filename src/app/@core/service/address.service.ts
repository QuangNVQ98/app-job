import { Injectable } from '@angular/core';
import { PROVINCES } from "../mock/provinces";
import { DISTRICTS } from "../mock/districts";
import { WARDS } from "../mock/wards";
import * as AppUtil from "src/app/@core/helper/common.helper";

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor() { }

  getProvinces() {
    return AppUtil.deepClone(PROVINCES);
  }

  getProvince(id: number) {
    return AppUtil.deepClone(PROVINCES.find(p => p.id == id));
  }

  getDistrict(id: number) {
    return AppUtil.deepClone(DISTRICTS.find(d => d.id == id));
  }

  getDistByPro(proId: number) {
    return AppUtil.deepClone(DISTRICTS.filter(d => d.province_id == proId));
  }

  getWard(id: number) {
    return AppUtil.deepClone(WARDS.find(w => w.id == id));
  }

  getWardsByDist(distId: number) {
    return AppUtil.deepClone(WARDS.filter(w => w.district_id == distId));
  }
}

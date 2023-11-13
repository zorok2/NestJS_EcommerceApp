/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapProxy {
  private readonly logger = new Logger(MapProxy.name);
  private readonly baseUrl = 'http://localhost:3100/api/v1';
  constructor(private readonly httpClient: HttpService) {}

  async getDistance(destination: string, origin: string) {
    const apiKey = '44UvhQS2PY0PW4NjVU7OeI4CQ1C2gczYXDfxvl6t';
    const url = `https://rsapi.goong.io/DistanceMatrix?origins=${origin}&destinations=${destination}&vehicle=car&api_key=${apiKey}`;
    try {
      const response = await this.httpClient.get(url).toPromise();
      if (response.status === 200) {
        const data = response.data;
        const rows = data['rows'] as Array<any>;
        const elements = rows[0]['elements'] as Array<any>;
        const distanceElement = elements[0]['distance'];
        return distanceElement.value;
        // do something with distanceElement.text and durationElement.text
      } else {
        // handle non-200 response
      }
    } catch (error) {
      // handle error
    }
  }

  async getLatitudeFromAddress(address: string): Promise<string | null> {
    const NodeGeocoder = require('node-geocoder');
    const options = {
      provider: 'google',
      apiKey: 'AIzaSyCw1cqjgzByj2kxDDWAsa4_GKkwu09rPXI', // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
      //provider: 'openstreetmap',
    };
    const geocoder = NodeGeocoder(options);
    const locations = await geocoder.geocode(address);
    if (locations.length > 0) {
      const latitude = locations[0].latitude;
      const longitude = locations[0].longitude;
      console.log(locations);
      console.log(latitude.toFixed(4));
      return latitude + ', ' + longitude;
    }
    // else {
    //   return null;
    // }
  }

  async getLocation(address: string): Promise<any> {
    const apiKey = '44UvhQS2PY0PW4NjVU7OeI4CQ1C2gczYXDfxvl6t';
    const url = `https://rsapi.goong.io/geocode?address=${address}&api_key=${apiKey}`;
    console.log(url);
    try {
      const response = await this.httpClient.get(url).toPromise();
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        const elements = data.results[0];
        const { formatted_address, geometry } = elements;
        const { lat, lng } = geometry.location;
        console.log(elements);
        return lat + ',' + lng;
        // do something with distanceElement.text and durationElement.text
      } else {
        // handle non-200 response
      }
    } catch (error) {
      // handle error
    }
  }
}

import { ReactNode } from 'react'

// types.d.ts
declare namespace TYPES {
  type Pagination<T> = {
    content: Array<T>
    totalPages: number
    totalElements: number
  }
  type Template = {
    id: string
    previewUrl: string
  }
  type Range = {
    startDate: string
    endDate: string
  }

  type UserState = 'unauthenticated' | 'authenticated' | 'pending'
  type PropertyImage = {
    image: Blob
    description: string
  }
  type PlaceOffer = {
    key: string
    label: string
    icon: ReactNode
  }
  type PropertyFormData = {
    designId: string
    address: {
      // Address step
      street: string
      city: string
      country: string
      zipCode: string
      floor: number
      apartmentNum: number
    }
    details: {
      // Details step
      size: string
      bedrooms: number
      bathrooms: number
      rooms: number
      price: number
      currency: string
      period: string
      placeOffers: Array<PlaceOffer>
    }
    images: Array<PropertyImage>

    description: {
      description: string
      firstName: string
      lastName: string
      phone: {
        country: string
        number: string
      }
      email: string
    }
  }
  type country = {
    flags: {
      png: string
      svg: string
    }
    name: {
      common: string
    }
  }
}

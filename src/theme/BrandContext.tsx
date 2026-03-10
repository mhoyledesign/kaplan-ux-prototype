import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Brand, brands, defaultBrand } from './brands'

interface BrandContextValue {
  brand: Brand
  setBrand: (id: string) => void
}

const BrandContext = createContext<BrandContextValue>({
  brand: defaultBrand,
  setBrand: () => {},
})

function applyBrandColors(brand: Brand) {
  const root = document.documentElement
  root.style.setProperty('--brand-primary', brand.colors.primary)
  root.style.setProperty('--brand-primary-hover', brand.colors.primaryHover)
  root.style.setProperty('--brand-primary-pressed', brand.colors.primaryPressed)
  root.style.setProperty('--brand-primary-light', brand.colors.primaryLight)
  root.style.setProperty('--brand-primary-lighter', brand.colors.primaryLighter)
  root.style.setProperty('--primary', brand.colors.primary)
  root.style.setProperty('--sidebar-primary', brand.colors.primary)
  root.style.setProperty('--sidebar-accent', brand.colors.primaryLight)
  root.style.setProperty('--sidebar-accent-foreground', brand.colors.primary)
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(defaultBrand)

  useEffect(() => {
    applyBrandColors(brand)
  }, [brand])

  const setBrand = (id: string) => {
    const b = brands[id]
    if (b) setBrandState(b)
  }

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand() {
  return useContext(BrandContext)
}

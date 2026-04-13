import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Counter Core Functionality', () => {
  beforeEach(() => {
    render(<App />)
  })

  describe('Initial State', () => {
    it('should display initial count of 0', () => {
      // Use getAllByText and check the first one (the large counter display)
      const counterDisplays = screen.getAllByText('0')
      expect(counterDisplays.length).toBeGreaterThanOrEqual(1)
      expect(counterDisplays[0]).toBeInTheDocument()
    })

    it('should render the app title', () => {
      // Use getAllByText since "Sayaç" appears multiple times
      const titles = screen.getAllByText('Sayaç')
      expect(titles.length).toBeGreaterThanOrEqual(1)
      expect(titles[0]).toBeInTheDocument()
    })

    it('should render navigation items', () => {
      expect(screen.getByText('Geçmiş')).toBeInTheDocument()
      expect(screen.getByText('Kilometre Taşları')).toBeInTheDocument()
      expect(screen.getByText('Ayarlar')).toBeInTheDocument()
    })
  })

  describe('Increment Functionality', () => {
    it('should increment count when Artır button is clicked', () => {
      const incrementButton = screen.getByLabelText('Artır')
      fireEvent.click(incrementButton)
      
      // After increment, we should see "1" in the counter display
      const counterDisplays = screen.getAllByText('1')
      expect(counterDisplays.length).toBeGreaterThanOrEqual(1)
      expect(counterDisplays[0]).toBeInTheDocument()
    })

    it('should increment multiple times correctly', () => {
      const incrementButton = screen.getByLabelText('Artır')
      
      fireEvent.click(incrementButton)
      fireEvent.click(incrementButton)
      fireEvent.click(incrementButton)
      
      const counterDisplays = screen.getAllByText('3')
      expect(counterDisplays.length).toBeGreaterThanOrEqual(1)
      expect(counterDisplays[0]).toBeInTheDocument()
    })
  })

  describe('Decrement Functionality', () => {
    it('should decrement count when Azalt button is clicked', () => {
      const incrementButton = screen.getByLabelText('Artır')
      const decrementButton = screen.getByLabelText('Azalt')
      
      // First increment to have something to decrement
      fireEvent.click(incrementButton)
      fireEvent.click(incrementButton)
      
      const displaysWith2 = screen.getAllByText('2')
      expect(displaysWith2.length).toBeGreaterThanOrEqual(1)
      
      // Then decrement
      fireEvent.click(decrementButton)
      
      const displaysWith1 = screen.getAllByText('1')
      expect(displaysWith1.length).toBeGreaterThanOrEqual(1)
    })

    it('should not decrement below 0', () => {
      const decrementButton = screen.getByLabelText('Azalt')
      
      // Try to decrement when count is 0
      fireEvent.click(decrementButton)
      
      // Should still be 0
      const counterDisplays = screen.getAllByText('0')
      expect(counterDisplays.length).toBeGreaterThanOrEqual(1)
    })

    it('should disable decrement button when count is 0', () => {
      const decrementButton = screen.getByLabelText('Azalt')
      expect(decrementButton).toBeDisabled()
    })
  })

  describe('Reset Functionality', () => {
    it('should reset count to 0 when Sıfırla button is clicked', () => {
      const incrementButton = screen.getByLabelText('Artır')
      const resetButtons = screen.getAllByLabelText('Sıfırla')
      
      // Increment first
      fireEvent.click(incrementButton)
      fireEvent.click(incrementButton)
      fireEvent.click(incrementButton)
      
      const displaysWith3 = screen.getAllByText('3')
      expect(displaysWith3.length).toBeGreaterThanOrEqual(1)
      
      // Then reset using the first reset button
      fireEvent.click(resetButtons[0])
      
      // Should be back to 0
      const counterDisplays = screen.getAllByText('0')
      expect(counterDisplays.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Counter Display', () => {
    it('should display large counter number prominently', () => {
      const counterDisplays = screen.getAllByText('0')
      // The first one should be the large display
      expect(counterDisplays[0]).toHaveClass('text-[12rem]')
    })

    it('should show current and last values in stats', () => {
      const mevcutLabel = screen.getByText('Mevcut')
      const sonLabel = screen.getByText('Son')
      
      expect(mevcutLabel).toBeInTheDocument()
      expect(sonLabel).toBeInTheDocument()
    })
  })

  describe('Button Accessibility', () => {
    it('should have accessible labels for all control buttons', () => {
      expect(screen.getByLabelText('Artır')).toBeInTheDocument()
      expect(screen.getByLabelText('Azalt')).toBeInTheDocument()
      expect(screen.getAllByLabelText('Sıfırla').length).toBeGreaterThan(0)
    })

    it('should have accessible labels for header buttons', () => {
      expect(screen.getByLabelText('Geçmiş')).toBeInTheDocument()
      expect(screen.getByLabelText('Ayarlar')).toBeInTheDocument()
    })
  })
})

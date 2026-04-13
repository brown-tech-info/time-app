import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeCard from '../components/TimeCard';
import type { City } from '../types';

const tokyo: City = { name: 'Tokyo', country: 'JP', timezone: 'Asia/Tokyo', lat: 35.68, lng: 139.69 };

describe('TimeCard', () => {
  it('renders city name and country', () => {
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} />);

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('shows Home badge when isHome is true', () => {
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} isHome />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows remove button when onRemove is provided and not home', () => {
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} onRemove={() => {}} />);

    expect(screen.getByLabelText('Remove Tokyo')).toBeInTheDocument();
  });

  it('does not show remove button for home card', () => {
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} isHome onRemove={() => {}} />);

    expect(screen.queryByLabelText('Remove Tokyo')).not.toBeInTheDocument();
  });

  it('displays category label for accessibility', () => {
    // 10:00 UTC = 19:00 JST → early-late
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} />);

    expect(screen.getByText('Early / Late')).toBeInTheDocument();
  });

  it('has aria-label with city info', () => {
    const meetingTime = new Date('2026-06-15T10:00:00Z');
    render(<TimeCard city={tokyo} meetingTime={meetingTime} />);

    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-label',
      'Time in Tokyo, JP',
    );
  });
});

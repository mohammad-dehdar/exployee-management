import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from './switch';

describe('Switch Component', () => {
  const renderSwitch = (props = {}) => render(<Switch data-testid="switch" {...props} />);

  test('renders with default props', () => {
    renderSwitch();

    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toBeInTheDocument();
  });

  test('renders with checked state', () => {
    renderSwitch({ checked: true });
    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  test('renders children inside switch', () => {
    renderSwitch({
      children: <span data-testid="switch-icon">🌙</span>,
    });
    expect(screen.getByTestId('switch-icon')).toBeInTheDocument();
  });

  test('handles direction prop', () => {
    renderSwitch({ dir: 'rtl' });

    expect(screen.getByTestId('switch')).toHaveAttribute('dir', 'rtl');
  });

  test('calls onCheckedChange when clicked', () => {
    const handleChange = jest.fn();
    renderSwitch({ onCheckedChange: handleChange });

    fireEvent.click(screen.getByTestId('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { IconDotsVertical } from '@tabler/icons'
import { IconButton } from '@/components'
import { FontWeightTypes } from '@/types'

export const LinkItemStyled = styled.div(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    margin-bottom: ${theme.spaces[4]};
    background: white;
    color: black;
    border-radius: ${theme.radius.normal};
  `
)

export const LinkItemHandle = styled.button(
  ({ theme }) => css`
    cursor: pointer;
    border: none;
    background: transparent;
    padding-left: ${theme.spaces[2.5]};
    cursor: grab;
  `
)

export const HandleIcon = styled(IconDotsVertical)(
  ({ theme }) => css`
    color: ${theme.colors.gray};
    width: 20px;
  `
)

export const LinkItemContent = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${theme.spaces[4]};
    padding: ${theme.spaces[4]};
  `
)

export const LinkInput = styled.input<{ fontWeight?: FontWeightTypes }>(
  ({ theme, fontWeight = '400' }) => css`
    background: transparent;
    border: none;
    font-weight: ${theme.text.fontWeight[fontWeight]};
    font-size: ${theme.text.fontSize.sm};

    width: 100%;
    max-width: 400px;
    margin-right: ${theme.spaces[6]};

    :focus {
      outline: none;
    }
  `
)

export const AnalyticsButton = styled(IconButton)(
  ({ theme }) => css`
    cursor: default;
    margin-left: -3px;
    font-size: ${theme.text.fontSize.sm};
    gap: ${theme.spaces[1]};
  `
)
